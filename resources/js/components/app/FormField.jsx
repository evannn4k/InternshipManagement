import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

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
    className,
}) {
    const RenderInput = () => {
        switch (type) {
            case "text":
            case "password":
            case "email":
            case "number":
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
            case "select":
                return (
                    <select
                        id={name}
                        onChange={onChange}
                        value={value}
                    ></select>
                );
            default:
                return null;
        }
    };

    return (
        <Field className={className} data-invalid={Boolean(error)}>
            <FieldLabel htmlFor="name">
                {label}
                <RenderInput />
                {required && <span className="text-destructive">*</span>}
            </FieldLabel>

            {error && <FieldError>{error}</FieldError>}
        </Field>
    );
}
