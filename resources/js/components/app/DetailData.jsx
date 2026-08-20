import { CardDescription, CardTitle } from "../ui/card";

export default function DetailData({ name, value }) {
    return (
        <div className="flex flex-col gap-1">
            <CardDescription>{name}</CardDescription>
            <CardTitle className="text-neutral-700">{value ?? "-"}</CardTitle>
        </div>
    );
}
