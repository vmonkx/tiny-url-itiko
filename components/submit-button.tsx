import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	loadingText: string;
	pending: boolean;
}

export const SubmitButton = ({
	text,
	loadingText,
	pending,
	...props
}: SubmitButtonProps) => {
	return (
		<Button {...props} type="submit" disabled={pending}>
			{pending ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					{loadingText}
				</>
			) : (
				text
			)}
		</Button>
	);
};
