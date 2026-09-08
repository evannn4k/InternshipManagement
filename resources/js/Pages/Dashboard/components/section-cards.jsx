import { DashboardCard } from "./dashboard-card";

export function SectionCards() {
    const dataCard = [
        {
            title: "Total Internships",
            value: 30,
            description: "Total peserta magang yang aktif.",
        },
        {
            title: "Total Tugas",
            value: 30,
            description: "Total tugas yang harus diselesaikan.",
        },
        {
            title: "Total Laporan Mingguan",
            value: 30,
            description: "Total laporan mingguan yang sudah dikirim.",
        },
        {
            title: "Total Dokumen",
            value: 30,
            description: "Total dokumen yang sudah dikirim.",
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
