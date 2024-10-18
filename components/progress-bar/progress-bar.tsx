"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type ProgressBarTypes = {
	step: number;
}
export const ProgressBar = ({step}: ProgressBarTypes) => {
	const pathName = usePathname();

	return <div className={clsx("progress-bar-container", step && `step-${step}`)}>
		<Link href={"/"}>Step 1</Link>
		<Link href={"/"}>Step 2</Link>
		<Link href={"/"}>Step 3</Link>
		<Link href={"/"}>Step 4</Link>
	</div>
}