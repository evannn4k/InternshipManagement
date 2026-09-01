import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { Textarea } from "../ui/textarea";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldTitle,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FormField({
    label,
    name,
    type = "text",
    description,
    value,
    onChange,
    error,
    required = false,
    placeholder = "",
    options = [],
    col = 1,
    step = 1,
    hidden = false,
    disabled = false,
    setData = false,
    orientation = "vertical",
    className,
}) {
    if (hidden) return null;

    const renderInput = () => {
        switch (type) {
            case "text":
            case "time":
            case "datetime-local":
            case "password":
            case "email":
            case "file":
            case "date":
                return (
                    <Input
                        aria-invalid={Boolean(error)}
                        id={name}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        type={type}
                        disabled={disabled}
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
                        disabled={disabled}
                    />
                );
            case "select":
                return (
                    <NativeSelect
                        aria-invalid={Boolean(error)}
                        id={name}
                        onChange={onChange}
                        value={value}
                        disabled={disabled}
                    >
                        {options.map((option, i) => (
                            <NativeSelectOption key={i} value={option.value}>
                                {option.label}
                            </NativeSelectOption>
                        ))}
                    </NativeSelect>
                );
            case "textarea":
                return (
                    <Textarea
                        aria-invalid={Boolean(error)}
                        id={name}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        disabled={disabled}
                    />
                );
            case "radio-group":
                return (
                    <RadioGroup
                        aria-invalid={Boolean(error)}
                        id={name}
                        onValueChange={(value) =>
                            setData((data) => ({ ...data, [name]: value }))
                        }
                        value={value}
                        disabled={disabled}
                        className={
                            orientation === "horizontal"
                                ? "grid grid-cols-2 gap-4"
                                : "flex flex-col gap-2"
                        }
                    >
                        {options.map((option) => (
                            <FieldLabel
                                htmlFor={option.value}
                                key={option.value}
                            >
                                <Field orientation="horizontal">
                                    <FieldContent>
                                        <FieldTitle>{option.label}</FieldTitle>
                                    </FieldContent>
                                    <RadioGroupItem
                                        value={option.value}
                                        id={option.value}
                                    />
                                </Field>
                            </FieldLabel>
                        ))}
                    </RadioGroup>
                );
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

            {error ? (
                <FieldError>{error}</FieldError>
            ) : (
                description && (
                    <FieldDescription>{description}</FieldDescription>
                )
            )}
        </Field>
    );
}
