import { cn } from "@/lib/utils";
import { FieldGroup } from "../ui/field";

export default function FormSection({ children, col = 1, gap = 4, className }) {
    return (
        <FieldGroup
            className={cn(
                `grid md:grid-cols-${col} grid-cols-1 gap-${gap} ${className}`,
                className,
            )}
        >
            {children}
        </FieldGroup>
    );
}
