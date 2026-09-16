import Layout from "@/layouts/layout";
import { SectionCards } from "./components/section-cards";
import { DashboardTask } from "./components/dashboard-task";
import { DashboardAttendance } from "./components/dashboard-attendance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardChart from "./components/dashboard-chart";

export default function Dashboard({ data, tasks, attendances, chartData }) {    
    let { chartAttendance, chartTask } = chartData;

    chartAttendance = Object.entries(chartAttendance).map((ca) => {
        return {
            day: ca[0],
            total_present: ca[1].total_present,
            total_absent: ca[1].total_absent,
        };
    });

    chartTask = Object.entries(chartTask).map((ca) => {
        return {
            day: ca[0],
            total_task: ca[1].total_task,
            total_completed: ca[1].total_completed,
        };
    });

    const attendanceChart = {
        chartData: chartAttendance,
        chartConfig: {
            total_absent: {
                label: "Tidak masuk",
                color: "#2b7fff",
            },
            total_present: {
                label: "Masuk",
                color: "#5ee9b5",
            },
        },
    };

    const taskChart = {
        chartData: chartTask,
        chartConfig: {
            total_completed: {
                label: "Tugas selesai",
                color: "#2b7fff",
            },
            total_task: {
                label: "Total tugas",
                color: "#5ee9b5",
            },
        },
    };

    return (
        <Layout header="Dashboard">
            <SectionCards data={data} />
            <div className="grid grid-cols-1 gap-4 @xl/main:gap-6 @xl/main:grid-cols-2 ">
                <Card>
                    <CardHeader>
                        <CardTitle>Absensi</CardTitle>
                        <CardDescription>
                            Menampilkan data absensi 7 hari terakhir
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DashboardChart
                            name="day"
                            firstData="total_absent"
                            secondData="total_present"
                            chartData={attendanceChart.chartData}
                            chartConfig={attendanceChart.chartConfig}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Tugas</CardTitle>
                        <CardDescription>
                            Menampilkan data tugas 7 hari terakhir
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DashboardChart
                            name="day"
                            firstData="total_completed"
                            secondData="total_task"
                            chartData={taskChart.chartData}
                            chartConfig={taskChart.chartConfig}
                        />
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Absensi dan Tugas Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 @xl/main:gap-6 @xl/main:grid-cols-2 ">
                        <DashboardTask tasks={tasks} />
                        <DashboardAttendance attendances={attendances} />
                    </div>
                </CardContent>
            </Card>
        </Layout>
    );
}
