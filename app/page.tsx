import { UrlContainer } from "@/components/url-container";
import { auth } from "@/lib/auth";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
	const session = await auth();

	return (
		<main className="mx-auto max-w-xl py-3 space-y-6 w-full">
			<div className="container p-2">
				{session ? (
					<>
						<div className="space-y-2 text-center">
							<h1 className="text-3xl md:text-4xl font-bold">
								Сокращатель ссылок
							</h1>
							<p className="md:text-lg">
								Сокращайте и управляйте списком ссылок
							</p>
						</div>
						<UrlContainer />
					</>
				) : (
					<div className="text-center">
						<Link
							href="/signin"
							className="bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2 rounded-lg inline-flex items-center justify-center whitespace-nowrap"
						>
							Войти
						</Link>
					</div>
				)}
			</div>
		</main>
	);
}
