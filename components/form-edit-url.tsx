"use client";
import { EditShortUrlSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import { Button } from "./ui/button";
import { editShortUrl } from "@/lib/actions/url.actions";
import { Loader2 } from "lucide-react";

type UrlType = {
	id: string;
	shortCode: string;
	originalUrl: string;
	visits: number;
	comment: string;
};

export const FormEditUrl = ({
	url,
	toggleClose,
}: {
	url: UrlType;
	toggleClose: (value: boolean) => void;
}) => {
	const form = useForm<z.infer<typeof EditShortUrlSchema>>({
		resolver: zodResolver(EditShortUrlSchema),
		defaultValues: {
			id: url.id,
			originalUrl: url.originalUrl,
			comment: url.comment,
		},
	});

	async function onSubmit(values: z.infer<typeof EditShortUrlSchema>) {
		const formData = new FormData();

		Object.entries(values).forEach(([key, value]) =>
			formData.append(key, value)
		);

		const editedUrl = await editShortUrl(formData);
		toggleClose(false);
		return editedUrl;
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="mb-5 space-y-5">
				<FormField
					control={form.control}
					name="originalUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Оригинальная ссылка</FormLabel>
							<FormControl>
								<Input placeholder="Например https://google.com" {...field} />
							</FormControl>
							<FormDescription>
								Ссылка которую вы хотите сократить
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
							<FormLabel>Комментарий к ссылке</FormLabel>
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
				<Button type="submit">
					{form.formState.isSubmitting ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Сохраняю...
						</>
					) : (
						<span>Сохранить</span>
					)}
				</Button>
			</form>
		</Form>
	);
};
