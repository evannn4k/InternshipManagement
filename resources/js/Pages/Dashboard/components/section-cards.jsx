import { DashboardCard } from "./dashboard-card";

export function SectionCards({ data, role }) {
    let dataCard = [];

    if (role == "admin") {
        dataCard = [
            {
                title: "Total Intern Aktif",
                value: data.total_intern ?? 0,
                description: "Total peserta magang yang aktif.",
            },
            {
                title: "Total Tugas",
                value: data.total_task ?? 0,
                description: "Total seluruh tugas peserta magang.",
            },
            {
                title: "Total Laporan Mingguan",
                value: data.total_report ?? 0,
                description: "Total laporan mingguan yang sudah disetujui.",
            },
            {
                title: "Total Dokumen",
                value: data.total_document ?? 0,
                description: "Total dokumen yang sudah diterima.",
            },
            {
                title: "Total Tugas Telat",
                value: data.total_overdue_task ?? 0,
                description: "Total tugas yang telat.",
            },
            {
                title: "Total Program",
                value: data.total_program ?? 0,
                description: "Total program aktif.",
            },
            {
                title: "Total Evaluasi",
                value: data.total_evaluation ?? 0,
                description: "Total evaluasi.",
            },
            {
                title: "Total Sekolah",
                value: data.total_school ?? 0,
                description: "Total sekolah aktif.",
            },
        ];
    } else if (role == "mentor") {
        dataCard = [
            {
                title: "Total intern aktif",
                value: data.assign_active_intern ?? 0,
                description: "Total intern aktif yang ditempatkan.",
            },
            {
                title: "Tugas Telat",
                value: data.overdue_task ?? 0,
                description: "Total tugas yang telat.",
            },
            {
                title: "Tugas Belum Direview",
                value: data.task_awaiting_review ?? 0,
                description: "Total tugas yang belum direview.",
            },
            {
                title: "Laporan Belum Direview",
                value: data.report_awaiting_review ?? 0,
                description: "Total laporan mingguan yang belum direview.",
            },
        ];
    } else {
        dataCard = [
            {
                title: "Evaluasi Terakhir",
                value: data.latest_evaluation_avg ?? 0,
                description: "Rata-rata skor evaluasi terakhir.",
            },
            {
                title: "Rata-rata Absensi",
                value: data.attendance_percentage ?? 0,
                description: "Rata-rata kehadiran saat ini.",
            },
            {
                title: "Tugas Telat",
                value: data.overdue_task ?? 0,
                description: "Total tugas yang telat.",
            },
            {
                title: "Total Tugas Tktif",
                value: data.active_task ?? 0,
                description: "Total tugas yang sedang berlangsung.",
            },
        ];
    }

    return (
        <div className="grid grid-cols-1 gap-4 @xl/main:gap-6 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-emerald-300/10 *:data-[slot=card]:to-white *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
            {dataCard.map((card, index) => (
                <DashboardCard
                    key={index}
                    title={card.title}
                    value={card.value}
                    description={card.description}
                />
            ))}
        </div>
    );
}
