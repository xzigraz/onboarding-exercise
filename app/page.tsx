import Link from "next/link";
import "./_homepage.page.scss";
import { MainLayout } from "@/ui-component/Layout/mainLayout";

export default async function Home() {
	
	return <MainLayout className="homepage">
		<>
			<h1>Let's get you a new quote</h1>
			<Link href="/onboarding">Get Started</Link>
		</>
	</MainLayout>;
}
