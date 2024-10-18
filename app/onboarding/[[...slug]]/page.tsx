import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { NameAndAddress } from "@/components/name-address/name-address";
import { ProgressBar } from "@/components/progress-bar/progress-bar";
import { CarPage } from "@/components/car/car";
import "./_onboarding.page.scss";

export interface Address {
	address1: string
	address2?: string | null
	city: string
	state: string
	stateCode: string
	postalCode: string
	country: string
	countryCode: string
}

export interface IntakeForm {
	firstName: string
	lastName: string
	address: Address
	step: number
}

async function getData() {
	// API call to get the form data from database
	const data = {
		firstName: "",
		lastName: "",
		address: {
			address1: "",
			address2: "",
			city: "",
			state: "",
			stateCode: "",
			postalCode: "",
			country: "",
			countryCode: ""
		},
		step: 1
	}
	return data;
}
export default async function Home() {
	const data: IntakeForm = await getData();
	
	return <MainLayout className="onboarding-page name-and-address">
		<>
			<ProgressBar step={data.step}/>
			<NameAndAddress data={data} />
			<CarPage data={data}/>
		</>
	</MainLayout>;
}
