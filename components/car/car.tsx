"use client";

import { IntakeForm } from "@/app/onboarding/[[...slug]]/page"
import { getCurrentStep } from "@/utils/getCurrentStep";
import { usePathname } from "next/navigation"

type CarTypes = {
	data: IntakeForm
}
export const CarPage = ({data}: CarTypes) => {
	const pathName = usePathname();
	const currentStep = getCurrentStep(pathName);
	
	return <>
		{(data.step === 2 || currentStep == 2) && <>Car</>}
	</>
}
