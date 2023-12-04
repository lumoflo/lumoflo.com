import { Loader } from "@gramflow/ui";

import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Create Order"
        text="Create a new order for a customer."
      />
      <div className="grid gap-10">
        <Loader />
      </div>
    </DashboardShell>
  );
}
