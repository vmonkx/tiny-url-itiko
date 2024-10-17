"use client";

import { CreateShortUrlSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { SubmitButton } from "./submit-button";
import { createShortUrl } from "@/lib/actions/url.actions";

export function CreateShortenUrlForm() {
	const form = useForm<z.infer<typeof CreateShortUrlSchema>>({
		resolver: zodResolver(CreateShortUrlSchema),
		defaultValues: { url: "", comment: "" },
	});

	async function onSubmit(values: z.infer<typeof CreateShortUrlSchema>) {
		const formData = new FormData();

		Object.entries(values).forEach(([key, value]) =>
			formData.append(key, value)
		);

		await createShortUrl(formData);
		form.reset();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="mb-5 space-y-5">
				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem>
							<FormLabel>URL</FormLabel>
							<FormControl>
								<Input placeholder="Например https://google.com" {...field} />
							</FormControl>
							<FormDescription>
								Введите ссылку которую вы хотите сократить
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="comment"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Комментарий</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								Оставьте комментарий описывающий ресурс
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<SubmitButton
					pending={form.formState.isSubmitting}
					className="w-full p-5"
					text="Сократить"
					loadingText="Сокращаю..."
				/>
			</form>
		</Form>
	);
}
