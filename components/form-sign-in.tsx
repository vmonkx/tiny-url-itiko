"use client";
import { signIn } from "next-auth/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Car } from "lucide-react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { login } from "@/lib/actions/user.actions";

export function FormSignIn() {
	const router = useRouter();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof LoginSchema>) {
		const res = await login(data);

		if (res.success) {
			router.push("/");
		} else {
			toast({ description: res.message, variant: "destructive" });
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl">Вход</CardTitle>
				<CardDescription>Войдите в свой аккаунт</CardDescription>
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
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div>
							<Link href="/signup">Нет аккаунта? Зарегистрируйтесь</Link>
						</div>
						<Button type="submit">Войти</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
