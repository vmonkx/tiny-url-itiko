"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { QrCode } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export const ButtonGetQR = ({ url }: { url: string }) => {
	const [qrImage, setQrImage] = useState("");

	const handleClick = async () => {
		const response = await fetch("/api/generate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ url }),
		});
		const data = await response.json();

		setQrImage(data);
	};

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button onClick={handleClick}>
						<QrCode className="w-4 h-4 mr-2" />
						QR-код
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Ваш QR-код</DialogTitle>
						<DialogDescription>
							QR-код ведет на короткую ссылку
						</DialogDescription>
					</DialogHeader>
					<div className="flex items-center space-x-2">
						<div className="grid flex-1">
							{qrImage ? (
								<Image src={qrImage} alt="qr" width={500} height={500} />
							) : (
								<Skeleton className="aspect-square rounded-xl" />
							)}
						</div>
					</div>
					<DialogFooter className="sm:justify-center"></DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
