import { z } from "zod";

export const CreateShortUrlSchema = z.object({
	url: z
		.string()
		.url({ message: "Введённая строка не является ссылкой" })
		.refine(
			value => /^(https?):\/\/(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(value),
			{
				message: "Введённая строка не является ссылкой",
			}
		),
	comment: z
		.string()
		.trim()
		.min(2, { message: "Введите комментарий (описание) для ссылки" }),
});

export const EditShortUrlSchema = z.object({
	id: z.string(),
	originalUrl: z
		.string()
		.url({ message: "Введённая строка не является ссылкой" })
		.refine(
			value => /^(https?):\/\/(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(value),
			{
				message: "Введённая строка не является ссылкой",
			}
		),
	comment: z
		.string()
		.trim()
		.min(2, { message: "Введите комментарий (описание) для ссылки" }),
});

export const RegisterUserSchema = z
	.object({
		email: z
			.string()
			.email({ message: "Введённая строка не является ссылкой" }),
		password: z
			.string()
			.min(6, { message: "Минимальная длина пароля 6 символов" }),
		confirmPassword: z
			.string()
			.min(6, { message: "Минимальная длина пароля 6 символов" }),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Пароли не совпадают",
		path: ["confirmPassword"],
	});

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});
