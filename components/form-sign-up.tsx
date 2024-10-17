"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterUserSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { createNewUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export const FormSignUp = () => {
	const form = useForm<z.infer<typeof RegisterUserSchema>>({
		resolver: zodResolver(RegisterUserSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const router = useRouter();

	async function onSubmit(data: z.infer<typeof RegisterUserSchema>) {
		const res = await createNewUser(data);

		if (res.success) {
			router.push("/signin");
		} else {
			toast({ description: res.message, variant: "destructive" });
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl">Регистрация</CardTitle>
				<CardDescription>Создание нового аккаунта</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Пароль</FormLabel>
									<FormControl>
										<Input type="password" placeholder="" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Подтверждение пароля</FormLabel>
									<FormControl>
										<Input type="password" placeholder="" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div>
							<Link className="underline text-gray-500 px-0" href="/signin">
								У вас уже есть аккаунт? Войдите
							</Link>
						</div>
						<Button type="submit">Зарегистрироваться</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
