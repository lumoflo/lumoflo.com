import { Loader } from "@lumoflo/ui";

import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";

export default function DashboardOrdersLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Orders"
        text="Manage your orders across various stores."
      />
      <div className="grid gap-10">
        <Loader />
      </div>
    </DashboardShell>
  );
}
