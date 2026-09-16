import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export default function DashboardChart({
    chartData,
    chartConfig,
    name,
    firstData,
    secondData,
}) {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <AreaChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey={name}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => String(value).slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <defs>
                    <linearGradient id={firstData} x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor={`var(--color-${firstData})`}
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor={`var(--color-${firstData})`}
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                    <linearGradient id={secondData} x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor={`var(--color-${secondData})`}
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor={`var(--color-${secondData})`}
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                </defs>
                <Area
                    dataKey={firstData}
                    type="natural"
                    fill={`url(#${firstData})`}
                    fillOpacity={0.4}
                    stroke={`var(--color-${firstData})`}
                />
                <Area
                    dataKey={secondData}
                    type="natural"
                    fill={`url(#${secondData})`}
                    fillOpacity={0.4}
                    stroke={`var(--color-${secondData})`}
                />
                <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
        </ChartContainer>
    );
}
