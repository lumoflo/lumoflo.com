import Link from "next/link";
import { auth, useUser } from "@clerk/nextjs";

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Loader,
} from "@gramflow/ui";

import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import { db } from "~/lib/prismaClient";

//get clerk user
const { userId }: { userId: string | null } = auth();

const getStores = async () => {
  console.log({ userId });
  return db.stores.findMany({
    where: {
      user_id: userId,
    },
  });
};

const stores = await getStores();

export default function Page() {
  console.log({ stores });
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Orders"
        text="Manage your orders across various stores."
      >
        <Link href="/dashboard/orders/new">
          <Button>New Order</Button>
        </Link>
      </DashboardHeader>
      <div className="grid grid-cols-2 gap-3 p-2 lg:grid-cols-3">
        <Loader></Loader>
      </div>
    </DashboardShell>
  );
}
