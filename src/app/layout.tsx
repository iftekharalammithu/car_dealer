import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Car Dealer",
	description:
		"Your trusted destination for quality vehicles. Browse our extensive selection of new and used cars, trucks, and SUVs with expert guidance from our experienced sales team.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={"antialiased"}>{children}</body>
		</html>
	);
}
