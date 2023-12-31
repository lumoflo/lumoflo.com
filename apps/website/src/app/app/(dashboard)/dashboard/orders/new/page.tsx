import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import OrderForm from "./components/orderFormComponent";

export default function Page() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Create Order"
        text="Create a new order for a customer."
      />
      <OrderForm />
    </DashboardShell>
  );
}
