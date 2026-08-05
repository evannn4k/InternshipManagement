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
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useForm } from "@inertiajs/react";
import { Spinner } from "@/components/ui/spinner";

export function LoginForm({ className, ...props }) {
    const { data, setData, post, errors, processing } = useForm({
        email: "evan@gmail.com",
        password: "123123123",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your email or password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">
                                    Email
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
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
                            <Field>
                                <FieldLabel htmlFor="password">
                                    Password<span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
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
                            <Field>
                                <Button type="submit" disabled={processing}>
                                    {processing && (
                                        <Spinner />
                                    )}
                                    Login</Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/register">Sign up</Link>
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
