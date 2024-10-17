import { FormSignUp } from "@/components/form-sign-up";
import { hasUsers } from "@/lib/actions/user.actions";

const SignUpPage = async () => {
	const isRegistration = await hasUsers();

	return (
		<div className="flex items-center justify-center min-h-screen bg-background">
			{!isRegistration ? (
				<FormSignUp />
			) : (
				<div>Чтобы зарегистрироваться обратитесь к администратору</div>
			)}
		</div>
	);
};

export default SignUpPage;
