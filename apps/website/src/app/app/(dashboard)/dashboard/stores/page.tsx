import {Button, Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@gramflow/ui";

import {DashboardHeader} from "~/components/header";
import {DashboardShell} from "~/components/shell";
import {db} from "@gramflow/db";

//get clerk user
// const getStores = async () => {
//     return db.stores.findMany({
//         where: {
//             user_id: user?.id,
//         },
//     });
// };

// const stores = await getStores();

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
