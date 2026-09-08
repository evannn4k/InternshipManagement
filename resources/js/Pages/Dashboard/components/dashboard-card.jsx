import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function DashboardCard({ title, value, description }) {
    return (
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {value}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-col items-start gap-1.5 text-sm">
                <div className="text-muted-foreground">{description}</div>
            </CardContent>
        </Card>
    );
}
