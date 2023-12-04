import { Loader } from "@gramflow/ui";

import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Stores"
        text="Manage your stores and their settings."
      />
      <div className="grid gap-10">
        <Loader />
      </div>
    </DashboardShell>
  );
}
