import {Button, Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@lumoflo/ui";

import {DashboardHeader} from "~/components/header";
import {DashboardShell} from "~/components/shell";


export default function Page() {
   // console.log({stores});
    return (
        <DashboardShell>
            <DashboardHeader
                heading="Stores"
                text="Manage your stores and their settings."
            />
            <div className="grid grid-cols-2 gap-3 p-2 lg:grid-cols-3">
                {/**/}
            </div>
        </DashboardShell>
    );
}
