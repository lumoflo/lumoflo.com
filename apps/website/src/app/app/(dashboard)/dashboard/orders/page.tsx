import {DashboardHeader} from "~/components/header";
import {DashboardShell} from "~/components/shell";

//get clerk user


export default function Page() {
    return (
        <DashboardShell>
            <DashboardHeader
                heading="Stores"
                text="Manage your stores and their settings."
            />
            <div className="grid grid-cols-2 gap-3 p-2 lg:grid-cols-3">
            </div>
        </DashboardShell>
    );
}
