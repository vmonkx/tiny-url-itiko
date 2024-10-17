"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { set } from "zod";

export const ButtonCopyUrl = ({ url }: { url: string }) => {
	const [copied, setCopied] = useState(false);

	const handleCopyUrl = () => {
		navigator.clipboard.writeText(url).then(() => {
			setCopied(true);

			setTimeout(() => {
				setCopied(false);
			}, 1500);
		});
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			className="text-muted-foreground hover:bg-muted"
			onClick={handleCopyUrl}
		>
			{copied ? (
				<CheckIcon className="w-4 h-4" />
			) : (
				<CopyIcon className="w-4 h-4" />
			)}
			<span className="sr-only">Copy URL</span>
		</Button>
	);
};
