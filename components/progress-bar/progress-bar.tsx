"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import { getOnboardingPath, PATH_TO_ONBOARDING } from "@/constants/paths";
import { getQuoteIdFromPathName } from "@/utils/getQuoteIdFromPathName";
import "./_progress-bar.scss";
import { getCurrentStep } from "@/utils/getCurrentStep";

type ProgressBarTypes = {
	step: number;
	quoteId: string | null
}
export const ProgressBar = ({ step, quoteId }: ProgressBarTypes) => {
	const pathName = usePathname();
	const currentStep = getCurrentStep(pathName) ? getCurrentStep(pathName) : step;
	const id = quoteId !== null ? quoteId : getQuoteIdFromPathName(pathName);

	return <SectionLayout className={clsx("progress-bar-container", currentStep && `step-${currentStep}`)}>
		<>
			<Link href={id ? getOnboardingPath(1, id) : PATH_TO_ONBOARDING} className={clsx(currentStep >= 1 && "active")}>Step 1</Link>
			{id
				? <Link href={getOnboardingPath(2, id)} className={clsx(currentStep >= 2 && "active")}>Step 2</Link>
				: <span>Step 2</span>
			}
			{id
				? <Link href={getOnboardingPath(3, id)} className={clsx(currentStep >= 3 && "active")}>Step 3</Link>
				: <span>Step 3</span>
			}
			{id
				? <Link href={getOnboardingPath(4, id)} className={clsx(currentStep === 4 && "active")}>Step 4</Link>
				: <span>Step 4</span>
			}
		</>
	</SectionLayout>
}