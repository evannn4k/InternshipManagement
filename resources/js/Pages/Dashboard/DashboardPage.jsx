import Layout from "@/layouts/layout";

export default function DashboardPage() {
    return (
        <>
        <Layout>
            <div className="">This is dashboard page</div>
            <br />
            <form action="logout" method="post">
                <button type="submit">Logout</button>
            </form>
        </Layout>
        </>
    );
}
