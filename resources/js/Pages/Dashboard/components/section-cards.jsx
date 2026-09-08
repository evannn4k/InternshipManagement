import { DashboardCard } from "./dashboard-card";

export function SectionCards({ data }) {
    const dataCard = [
        {
            title: "Total Internships",
            value: data.total_intern,
            description: "Total peserta magang yang aktif.",
        },
        {
            title: "Total Tugas",
            value: data.total_task,
            description: "Total seluruh tugas peserta magang.",
        },
        {
            title: "Total Laporan Mingguan",
            value: data.total_report,
            description: "Total laporan mingguan yang sudah disetujui.",
        },
        {
            title: "Total Dokumen",
            value: data.total_document,
            description: "Total dokumen yang sudah diterima.",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-emerald-300/10 *:data-[slot=card]:to-white *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
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
