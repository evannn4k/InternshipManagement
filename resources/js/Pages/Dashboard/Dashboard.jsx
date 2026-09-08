import Layout from "@/layouts/layout";
import { SectionCards } from "./components/section-cards";
import { DashboardTask } from "./components/dashboard-task";
import { DashboardAttendance } from "./components/dashboard-attendance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard({ data, tasks, attendances }) {
    return (
        <Layout header="Dashboard">
            <SectionCards data={data} />
            <Card>
                <CardHeader>
                    <CardTitle>Ringkasan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 ">
                        <DashboardTask tasks={tasks} />
                        <DashboardAttendance attendances={attendances} />
                    </div>
                </CardContent>
            </Card>
        </Layout>
    );
}
