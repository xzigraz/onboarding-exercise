import Link from "next/link";
import "./_homepage.page.scss";
import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";

export default async function Home() {
	
	return <MainLayout className="homepage">
		<>
			<SectionLayout>
				<>
					<h1>Let's get you a new quote!</h1>
					<Link href="/onboarding" className="td-button">Get Started</Link>
				</>
			</SectionLayout>
		</>
	</MainLayout>;
}
