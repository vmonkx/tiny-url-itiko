import { signOut } from "@/lib/auth";
import { Button } from "./ui/button";

export function SignOut() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}
		>
			<Button type="submit" variant="outline">
				Выйти
			</Button>
		</form>
	);
}
