import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { useState } from "react";

export default function RoleTable({ roles, permissions }) {
    const [selectedRole, setSelectedRole] = useState();

    // console.log(permissions);
    // console.log(roles);
    console.log(selectedRole);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
                <Card>
                    <CardHeader>
                        <h2 className="m-0">Daftar Peran</h2>
                    </CardHeader>
                    <CardContent>
                        <Table className="m-0">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center w-8">No</TableHead>
                                    <TableHead>Nama peran</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {roles.map((role, i) => (
                                    <TableRow>
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
                                                Detail
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
                        <h2 className="m-0">Daftar Perizinan</h2>
                    </CardHeader>
                    <CardContent>
                        {selectedRole ? (
                            <Table className="m-0">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-center w-8">
                                            No
                                        </TableHead>
                                        <TableHead>Nama perizinan</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {selectedRole?.permissions?.length > 0 ? (
                                        selectedRole?.permissions?.map(
                                            (permission, i) => (
                                                <TableRow>
                                                    <TableCell className="text-center w-8">
                                                        {i + 1}.
                                                    </TableCell>
                                                    <TableCell>
                                                        {permission.name}
                                                    </TableCell>
                                                    <TableCell className="text-end">
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                        >
                                                            <Trash />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                <div className="w-full flex justify-center">
                                                    Tidak memiliki perizinan
                                                </div>
                                            </TableCell>
                                        </TableRow>
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
