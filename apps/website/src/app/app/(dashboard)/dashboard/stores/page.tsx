import Link from "next/link";
import { auth, useUser } from "@clerk/nextjs";

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
        heading="Stores"
        text="Manage your stores and their settings."
      />
      <div className="grid grid-cols-2 gap-3 p-2 lg:grid-cols-3">
        {stores.map((store) => (
          <Card className="translate w-[400px] cursor-pointer transition duration-200 ease-in-out hover:scale-105">
            <CardHeader className="mb-3 rounded-t bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-3 text-white">
              <CardTitle className="font-heading">{store.name}</CardTitle>
              <p className="text-sm">@{store.username}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">{store.subdomain}.lumoflo.com</p>
              <div className="flex space-x-2 items-center">
              <p className="text-sm">Active</p>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
