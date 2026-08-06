import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import Layout from "@/layouts/layout";
import { Head } from "@inertiajs/react";
import { Plus, Search } from "lucide-react";
import RoleTable from "./components/role-table";

export default function RoleIndex({ roles, permissions }) {
    // console.log(roles);
    // console.log(permissions);
   
    return (
        <>
            <Head>
                <title>Sekolah</title>
                <meta name="description" content="Mengelola data sekolah" />
            </Head>
            <Layout header="Sekolah">
                <div className="typeset typeset-docs flex flex-col gap-4">
                    <div className="">
                        <h1>Peran dan Perizinan</h1>
                        <p className="m-0">
                            Mengelola data peran dan perizinan di Website ini
                        </p>
                    </div>
                    <div className="flex justify-between gap-2">
                        <form>
                            <InputGroup className="max-w-xs">
                                <InputGroupInput placeholder="Search..." />
                                <Button
                                    type="submit"
                                    variant="ghost"
                                    className="px-2 cursor-pointer"
                                    nativeButton={false}
                                    render={
                                        <InputGroupAddon align="end">
                                            <Search />
                                        </InputGroupAddon>
                                    }
                                />
                            </InputGroup>
                        </form>
                        <div className="flex gap-2 items-center">
                            <Button>
                                <Plus /> Tambah
                            </Button>
                        </div>
                    </div>
                    <RoleTable roles={roles} permissions={permissions}/>
                </div>
            </Layout>
        </>
    );
}
