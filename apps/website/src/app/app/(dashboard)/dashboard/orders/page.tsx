import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

import { authOptions } from "@lumoflo/auth";

import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ a: 1, b: 2 }),
  };

 await fetch(
    "https://play.svix.com/in/e_ZfHm0RTAD2QEy6ofCPZx0TcqydB/",
    options,
  )
    .then((response) => response.json())
    .then((data) => console.log(data));


  return (
    <DashboardShell>
      <DashboardHeader
        heading="Stores"
        text="Manage your stores and their settings."
      />
      <div className="grid grid-cols-2 gap-3 p-2 lg:grid-cols-3">
        {session?.expires}
      </div>
    </DashboardShell>
  );
}
