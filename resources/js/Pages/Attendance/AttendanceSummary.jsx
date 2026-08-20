import PageHeader from "@/components/app/PageHeader";
import Layout from "@/layouts/layout";
import { Head } from "@inertiajs/react";
import { useCan } from "@/hooks/use-can";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CalendarX, Clock, TrendingUp, Users } from "lucide-react";
import AttendanceSummaryTabble from "./components/attendance-summary-table";

export default function AttendanceSummary({ data }) {
    const { can } = useCan();

    console.log(data)

    const cardData = [
        {
            title: "Total Peserta Magang",
            value: data.data.length,
            icon: <Users />,
        },
        { title: "Kehadiran rata-rata", value: 93 + "%", icon: <TrendingUp /> },
        {
            title: "Total telat",
            value: data.data
                .flatMap((u) => u.active_placement?.attendance)
                .filter((a) => a?.status == "late").length,
            icon: <Clock />,
        },
        {
            title: "Total absen",
            value: data.data
                .flatMap((u) => u.active_placement?.attendance)
                .filter((a) => a?.status == "absent").length,
            icon: <CalendarX />,
        },
    ];

    return (
        <>
            <Head>
                <title>Ringkasan Absensi</title>
                <meta name="description" content="Mengelola data absensi" />
            </Head>
            <Layout header="Ringkasan Absensi">
                <PageHeader
                    title="Ringkasan Absensi"
                    description="Mengelola data absensi"
                />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 typeset typeset-docs">
                    {cardData.map((c) => (
                        <Card key={c.title} className="gap-2">
                            <CardHeader className="gap-4">
                                <CardTitle className="text-slate-600">
                                    {c.title}
                                </CardTitle>
                                <CardAction>{c.icon}</CardAction>
                            </CardHeader>
                            <CardContent>
                                <h2 className="m-0 text-4xl">{c.value}</h2>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <AttendanceSummaryTabble users={data.data} />
                {/* <ListPagination data={data} /> */}
            </Layout>
        </>
    );
}
