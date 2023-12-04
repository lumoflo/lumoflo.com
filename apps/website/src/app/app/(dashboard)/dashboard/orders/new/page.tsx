import Link from "next/link";
import { auth, useUser } from "@clerk/nextjs";

import { db } from "@gramflow/db";

import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import OrderForm from "./components/orderFormComponent";

//get clerk user
const { userId }: { userId: string | null } = auth();

const getSlides = async ({
  storeId,
  postLink,
}: {
  storeId: string;
  postLink: string;
}) => {
  console.log({ userId });
  return db.slides.findMany({
    where: {
      post_link: postLink,
    },
  });
};

const stores = await getSlides({
  storeId: "1",
  postLink: "https://www.instagram.com/p/COXv2dQjzH8/",
});

export default function Page() {
  console.log({ stores });
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
