import Layout from "@/layouts/layout";
import { SectionCards } from "./components/section-cards";

export default function Dashboard({data}) {
        console.log(data)
    return (
        <Layout>
            <SectionCards />
        </Layout>
    );
}
