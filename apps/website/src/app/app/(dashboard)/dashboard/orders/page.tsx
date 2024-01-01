import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";

export default async function Page() {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ a: 1, b: 2 }),
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Stores"
        text="Manage your stores and their settings."
      />
      <div className="grid grid-cols-2 gap-3 p-2 lg:grid-cols-3"></div>
    </DashboardShell>
  );
}
