import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { Textarea } from "../ui/textarea";

export default function FormField({
    label,
    name,
    type = "text",
    value,
    onChange,
    error,
    required = false,
    placeholder = "",
    options = [],
    col = 1,
    step = 1,
    hidden = false,
    className,
}) {
    if(hidden) return null;
    
    const renderInput = () => {
        switch (type) {
            case "text":
            case "time":
            case "password":
            case "email":
            case "date":
                return (
                    <Input
                        aria-invalid={Boolean(error)}
                        id={name}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        type={type}
                    />
                );
            case "number":
                return (
                    <Input
                        aria-invalid={Boolean(error)}
                        id={name}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        type={type}
                        step={step}
                    />
                );
            case "select":
                return (
                    <NativeSelect
                        aria-invalid={Boolean(error)}
                        id={name}
                        onChange={onChange}
                        value={value}
                    >
                        {options.map((option, i) => (
                            <NativeSelectOption key={i} value={option.value}>
                                {option.label}
                            </NativeSelectOption>
                        ))}
                    </NativeSelect>
                );
            case "textarea" :
                return (
                    <Textarea
                        aria-invalid={Boolean(error)}
                        id={name}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                    />
                )
            default:
                return null;
        }
    };

    return (
        <Field
            className={cn(`col-span-1 md:col-span-${col}`, className)}
            data-invalid={Boolean(error)}
        >
            <FieldLabel htmlFor="name">
                {label}
                {required && <span className="text-destructive">*</span>}
            </FieldLabel>
            {renderInput()}
            {error && <FieldError>{error}</FieldError>}
        </Field>
    );
}
