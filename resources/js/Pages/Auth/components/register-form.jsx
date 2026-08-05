import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useForm } from "@inertiajs/react";
import { Spinner } from "@/components/ui/spinner";

export function RegisterForm({ className, ...props }) {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/register");
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field data-invalid={Boolean(errors.name)}>
                                <FieldLabel htmlFor="name">
                                    Name
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                    aria-invalid={Boolean(errors.name)}
                                    id="name"
                                    type="text"
                                    placeholder="Michael"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <FieldError>{errors.name}</FieldError>
                                )}
                            </Field>
                            <Field data-invalid={Boolean(errors.email)}>
                                <FieldLabel htmlFor="email">
                                    Email
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                    aria-invalid={Boolean(errors.email)}
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                {errors.email && (
                                    <FieldError>{errors.email}</FieldError>
                                )}
                            </Field>
                            <Field data-invalid={Boolean(errors.password)}>
                                <FieldLabel htmlFor="password">
                                    Password
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                    aria-invalid={Boolean(errors.password)}
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    placeholder="••••••••"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                {errors.password && (
                                    <FieldError>{errors.password}</FieldError>
                                )}
                            </Field>
                            <Field
                                data-invalid={Boolean(
                                    errors.password_confirmation,
                                )}
                            >
                                <FieldLabel htmlFor="password_confirmation">
                                    Password Confirmation
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                    aria-invalid={Boolean(
                                        errors.password_confirmation,
                                    )}
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    placeholder="••••••••"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                />
                                {errors.password && (
                                    <FieldError>
                                        {errors.password_confirmation}
                                    </FieldError>
                                )}
                            </Field>
                            <Field>
                                <Button type="submit" disabled={processing}>
                                    {processing && <Spinner />}
                                    Register
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account?{" "}
                                    <Link href="/login">Sign in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    );
}
