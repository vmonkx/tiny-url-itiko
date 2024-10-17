import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { FormSignIn } from "@/components/form-sign-in";

export default async function SignInPage(props: {
	searchParams: { callbackUrl: string | undefined };
}) {
	return (
		<div className="flex items-center justify-center min-h-screen bg-background">
			<FormSignIn />
		</div>
	);
}
