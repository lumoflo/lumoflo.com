import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { LogSnag } from "logsnag";
import { Webhook } from "svix";

import { env } from "~/env.mjs";
import { db } from "~/lib/prismaClient";

const logsnag = new LogSnag({
  token: env.LOG_SNAG_API_TOKEN,
  project: "lumoflo",
});

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("No signing secret found.");
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    //syncing the data to supabase

    if (evt.type === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;

      const email = email_addresses[0]?.email_address;
      if (!email) {
        return new Response("No email found", {
          status: 400,
        });
      }
      await db.users.create({
        data: {
          id,
          email,
          name: `${first_name} ${last_name}`,
        },
      });
      console.log("User created", email);

      await logsnag.track({
        channel: "users",
        event: "New User",
        user_id: id,
        icon: "👤",
        notify: true,
        tags: {
          email,
          name: `${first_name} ${last_name}`,
        },
      });
    }
    return new Response("Success", {
      status: 200,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}
