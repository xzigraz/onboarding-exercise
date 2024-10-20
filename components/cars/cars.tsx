"use client";

import _ from "lodash";
import { IntakeForm } from "@/app/onboarding/[[...slug]]/page"
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import { getCurrentStep } from "@/utils/getCurrentStep";
import { getInputChangeData } from "@/utils/inputChangeEvent";
import updateObjectWithFormData from "@/utils/updateObjectWithFormData";
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react";
import { CarsTabe } from "./cars-table";
import { getOnboardingPath } from "@/constants/paths";
import { getQuoteIdFromPathName } from "@/utils/getQuoteIdFromPathName";

type CarTypes = {
	data: IntakeForm
}
export const CarPage = ({ data }: CarTypes) => {
	const router = useRouter();
	const pathName = usePathname();
	const currentStep = getCurrentStep(pathName) ? getCurrentStep(pathName) : data.step;
	const id = data.quoteId ? data.quoteId : getQuoteIdFromPathName(pathName);
	const [formData, setFormData] = useState<IntakeForm>(data);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		const updatedCar = getInputChangeData(e);

		handleFormDataChange(updatedCar);
	}

	const handleFormDataChange = (data: { [key: string]: string }) => {
		let newFormData = { ...formData };

		newFormData = updateObjectWithFormData(newFormData, data);
		
		setFormData(newFormData);
	}

	const handleAddCar = () => {
		const cars = _.cloneDeep(formData.cars);
		const car = {
			id: null,
			year: "",
			brand: "",
			model: "",
			createAt: new Date(),
			updatedAt: new Date()
		}

		cars.push(car);
		const newFormData = { ...formData, cars: cars };
		setFormData(newFormData);
	}

	const onHandleRemove = (index: number) => {
		const cars = _.cloneDeep(formData.cars);

		cars.splice(index, 1);

		const newFormData = { ...formData, cars: cars };
		setFormData(newFormData);
	}

	const handleFormSave = async () => {
		await fetch("/api/save", {method: "POST", body: JSON.stringify(formData)})
			.then(res => console.log(res))
			.then(()  => {
				router.push(getOnboardingPath(3, "aaa"))
			})
			.catch(error => {
				console.error(error);
				router.push(getOnboardingPath(3, id));
			});
	}

	return <>
		{currentStep == 2 &&
			<SectionLayout>
				<>
					<h1>Thank you firstName, let's add a car or cars to the policy.</h1>
					<CarsTabe
						name="cars"
						cars={formData.cars}
						onInputChange={handleInputChange}
						onHandleRemove={onHandleRemove} />
					<button className="td-button" onClick={() => handleAddCar()}>Add another car</button>
					<div className="actions-container">
						<button className="td-button" onClick={() => handleFormSave()}>Continue</button>
					</div>
				</>
			</SectionLayout>
		}
	</>
}
