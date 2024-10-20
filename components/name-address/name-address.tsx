'use client';

import { IntakeForm } from "@/app/onboarding/[[...slug]]/page";
import { getOnboardingPath } from "@/constants/paths";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout"
import { TextInput } from "@/ui-component/TextInput/textInput"
import { getCurrentStep } from "@/utils/getCurrentStep";
import { getQuoteIdFromPathName } from "@/utils/getQuoteIdFromPathName";
import { getInputChangeData } from "@/utils/inputChangeEvent"
import updateObjectWithFormData from "@/utils/updateObjectWithFormData"
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react"

type NameAndAddressTypes = {
	data: IntakeForm
}

export const NameAndAddress = ({ data }: NameAndAddressTypes) => {
	const router = useRouter();
	const pathName = usePathname();
	const currentStep = getCurrentStep(pathName) ? getCurrentStep(pathName) : data.step;
	const id = data.quoteId ? data.quoteId : getQuoteIdFromPathName(pathName);
	const [formData, setFormData] = useState<IntakeForm>(data);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		const data = getInputChangeData(e);
		handleFormDataChange(data);
	}

	const handleFormDataChange = (data: { [key: string]: string }) => {
		let newFormData = { ...formData };
		newFormData = updateObjectWithFormData(newFormData, data);

		setFormData(newFormData);
	}

	const handleFormSave = async () => {
		await fetch("/api/save", {method: "POST", body: JSON.stringify(formData)})
			.then(res => console.log(res))
			.then(() => {
				router.push(getOnboardingPath(2, "aaa"))
			})
			.catch(error => {
				console.error(error);
				router.push(getOnboardingPath(2, id ? id : "abc"));
			});
	}

	return <>
		{currentStep === 1 && <>
			<SectionLayout className="form-container">
				<>
					<h1>First, tell me about the primary driver.</h1>
					<div className="fields-equally-divided">
						<TextInput
							label="First Name"
							name="firstName"
							value={formData?.firstName}
							onValueChange={(e) => handleInputChange(e)} />
						<TextInput
							label="Last Name"
							name="lastName"
							value={formData?.lastName}
							onValueChange={(e) => handleInputChange(e)} />
					</div>
					<TextInput
						label="Address Line 1"
						name="address.address1"
						value={formData?.address?.address1}
						onValueChange={(e) => handleInputChange(e)} />
					<TextInput
						label="Address Line 2"
						name="address.address2"
						value={formData?.address?.address2}
						onValueChange={(e) => handleInputChange(e)} />
					<div className="fields-equally-divided">
						<TextInput
							label="City"
							name="address.city"
							value={formData?.address?.city}
							onValueChange={(e) => handleInputChange(e)} />
						<TextInput
							label="State"
							name="address.state"
							value={formData?.address?.state}
							onValueChange={(e) => handleInputChange(e)} />
						<TextInput
							label="Zip"
							name="address.postalCode"
							value={formData?.address?.postalCode}
							onValueChange={(e) => handleInputChange(e)} />
						<TextInput
							label="Country"
							name="address.country"
							value={formData?.address?.country}
							onValueChange={(e) => handleInputChange(e)} />
					</div>
					<div className="actions-container">
						<button className="td-button" onClick={() => handleFormSave()}>Continue</button>
					</div>
				</>
			</SectionLayout>
		</>}
	</>
}