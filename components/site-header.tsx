import { auth } from "@/lib/auth";
import itikoIcon from "../app/itiko.svg";
import Image from "next/image";
import Link from "next/link";
import { SignOut } from "./sign-out";

export const SiteHeader = async () => {
	const session = await auth();

	return (
		<header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto container h-24 ">
				<div className="grid grid-cols-3  w-full justify-center items-center">
					<Link
						href="/"
						className="flex col-start-2 justify-center items-center space-x-2"
					>
						<Image
							src={itikoIcon}
							className="h-24 w-24"
							alt="Itiko logo"
							loading="lazy"
						/>
					</Link>
					{session && (
						<div className="flex flex-grow-[1] justify-self-end items-center">
							<SignOut />
						</div>
					)}
				</div>
			</div>
		</header>
	);
};
