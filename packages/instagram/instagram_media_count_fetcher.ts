import { z } from "zod";

const InstagramMediaCountResponseSchema = z.object({
  media_count: z.number(),
  id: z.string(),
});

export const InstagramMediaCount = async ({
  username,
  token,
}: {
  username: string;
  token: string;
}) => {
  const req = await fetch(
    `https://graph.instagram.com/v11.0/me?fields=media_count,username&access_token=${env.INSTAGRAM_TOKEN}`,
  );
  if (!req.ok) {
    return 0;
  }
  const data = (await req.json()) as z.infer<
    typeof InstagramMediaCountResponseSchema
  >;
  const validatedData = InstagramMediaCountResponseSchema.parse(data);
  return validatedData.media_count;
};
