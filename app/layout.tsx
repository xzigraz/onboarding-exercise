import React from "react";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "normalize.css";
import "@/ui-component/scss/_baseline.scss";
import "@/assets/scss/style.scss";

const lexend = Lexend({ subsets: ['latin']});

export const metadata: Metadata = {
	title: "Onboarding exercise",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
			</head>
			<body className={lexend.className}>
				{children}
			</body>
		</html>
	);
}
