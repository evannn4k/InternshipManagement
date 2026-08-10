import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useForm } from "@inertiajs/react";
import { Plus, Save } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

export default function RoleMenu({ roles, permissions }) {
    const [selectedRole, setSelectedRole] = useState();
    const { put, data, setData, processing, errors } = useForm({
        permissions: null,
    });

    useEffect(() => {
        setData({ permissions: selectedRole?.permissions.map((p) => p.id) });
    }, [selectedRole]);

    const handleChange = (checked, id) => {
        if (checked) {
            setData({ permissions: [...data.permissions, id] });
        } else {
            setData({
                permissions: data.permissions.filter((perId) => perId != id),
            });
        }
    };

    const handleSave = () => {
        put("/role/sync-permission/" + selectedRole.id);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between gap-2 items-start">
                            <h2 className="m-0">Daftar Peran</h2>
                            <Button size="sm" variant="outline" className="m-0">
                                <Plus />
                                Tambah
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table className="m-0">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center w-8">
                                        No
                                    </TableHead>
                                    <TableHead>Nama peran</TableHead>
                                    <TableHead className="text-end">Perizinan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {roles.map((role, i) => (
                                    <TableRow key={role.id}>
                                        <TableCell className="text-center w-8">
                                            {i + 1}.
                                        </TableCell>
                                        <TableCell>{role.name}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    setSelectedRole(role)
                                                }
                                            >
                                                Lihat
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-1">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between gap-2 items-start">
                            <h2 className="m-0">Daftar Perizinan</h2>
                            {selectedRole && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="m-0"
                                    onClick={handleSave}
                                    disabled={processing}
                                >
                                    {processing ? <Spinner /> : <Save />}
                                    Save
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        {selectedRole ? (
                            <Table className="m-0">
                                <TableBody>
                                    {Object.entries(permissions).map(
                                        ([
                                            groupPermissionName,
                                            groupPermissionValue,
                                        ]) => (
                                            <Fragment key={groupPermissionName}>
                                                <TableRow>
                                                    <TableCell
                                                        className="font-semibold"
                                                        colSpan={2}
                                                    >
                                                        {groupPermissionName}
                                                    </TableCell>
                                                </TableRow>

                                                {groupPermissionValue.map(
                                                    (p) => (
                                                        <TableRow key={p.id}>
                                                            <TableCell className="text-center w-8">
                                                                <Checkbox
                                                                    id={p.name}
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) =>
                                                                        handleChange(
                                                                            checked,
                                                                            p.id,
                                                                        )
                                                                    }
                                                                    checked={Boolean(
                                                                        data?.permissions?.includes(
                                                                            p.id,
                                                                        ),
                                                                    )}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <label
                                                                    htmlFor={
                                                                        p.name
                                                                    }
                                                                >
                                                                    {p.name}
                                                                </label>
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )}
                                            </Fragment>
                                        ),
                                    )}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="p-8 w-fulll flex justify-center">
                                <p>Pilih peran terlebih dahulu</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
