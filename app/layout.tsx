import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
	subsets: ["cyrillic"],
	variable: "--font-roboto",
	weight: ["100", "300", "400", "500", "700", "900"],
	display: "swap",
});

// const geistSans = localFont({
// 	src: "./fonts/GeistVF.woff",
// 	variable: "--font-geist-sans",
// 	weight: "100 900",
// });
// const geistMono = localFont({
// 	src: "./fonts/GeistMonoVF.woff",
// 	variable: "--font-geist-mono",
// 	weight: "100 900",
// });

export const metadata: Metadata = {
	title: "Itiko - сокращатель ссылок",
	description: "Сервис по сокращению ссылок",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body className={`${roboto.className} antialiased`}>
				<div className="relative flex min-h-screen flex-col">
					<SiteHeader />

					{children}
					<Toaster />
				</div>
			</body>
		</html>
	);
}
