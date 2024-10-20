import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { NameAndAddress } from "@/components/name-address/name-address";
import { ProgressBar } from "@/components/progress-bar/progress-bar";
import { CarPage } from "@/components/cars/cars";
import "./_onboarding.page.scss";

export interface Address {
	id: string | null,
	address1: string
	address2?: string
	city: string
	state: string
	stateCode: string
	postalCode: string
	country: string
	countryCode: string
	createAt: Date | null
	updatedAt: Date | null
}

export interface IntakeForm {
	id: string | null
	quoteId: string | null
	firstName: string
	lastName: string
	address: Address
	cars: Array<Car>
	step: number
	createAt: Date | null
	updatedAt: Date | null
}

export interface Car {
	id: string | null
	year: string
	brand: string
	model: string
	createAt: Date | null
	updatedAt: Date | null
}

async function getData() {
	// API call to get the form data from database
	const data = {
		id: null,
		quoteId: null,
		firstName: "",
		lastName: "",
		address: {
			id: null,
			address1: "",
			address2: "",
			city: "",
			state: "",
			stateCode: "",
			postalCode: "",
			country: "",
			countryCode: "",
			createAt: new Date(),
			updatedAt: new Date()
		},
		step: 2,
		cars: [
			{
				id: null,
				year: "",
				brand: "",
				model: "",
				createAt: new Date(),
				updatedAt: new Date()
			}
		],
		createAt: new Date(),
		updatedAt: new Date()
	}
	return data;
}

export default async function Home() {
	const data: IntakeForm = await getData();
	
	return <MainLayout className="onboarding-page name-and-address">
		<>
			<ProgressBar step={data.step} quoteId={data.quoteId}/>
			<NameAndAddress data={data} />
			<CarPage data={data}/>
		</>
	</MainLayout>;
}
