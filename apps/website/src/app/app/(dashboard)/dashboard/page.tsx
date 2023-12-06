import Link from "next/link";
import {Button, Loader,} from "@lumoflo/ui";

import {DashboardHeader} from "~/components/header";
import {DashboardShell} from "~/components/shell";


export default function Page() {
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
