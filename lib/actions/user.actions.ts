"use server";
import { signIn } from "../auth";
import prisma from "../db";
import { compare, hash } from "bcrypt";

export async function getUserFromDb(email: string, password: string) {
	try {
		const existedUser = await prisma.user.findFirst({
			where: {
				email,
			},
		});

		if (!existedUser) {
			return {
				success: false,
				message: "User not found",
			};
		}

		if (!existedUser.password) {
			return {
				success: false,
				message: "Password not found. Password is required",
			};
		}

		const isPasswordValid = await compare(password, existedUser.password);

		if (!isPasswordValid) {
			return {
				success: false,
				message: "Password or login incorrect.",
			};
		}

		return {
			success: true,
			data: existedUser,
		};
	} catch (error: any) {
		return {
			success: false,
			message: error?.message,
		};
	}
}

export async function createNewUser({
	email,
	password,
	confirmPassword,
}: {
	email: string;
	password: string;
	confirmPassword: string;
}) {
	try {
		const existedUser = await getUserFromDb(email, password);

		if (existedUser.success) {
			return {
				success: false,
				message: "Такой пользователь уже существует",
			};
		}

		const hashPass = await hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashPass,
			},
		});

		return {
			success: true,
			data: newUser,
		};
	} catch (error: any) {
		return {
			success: false,
			message: error?.message,
		};
	}
}

export async function login({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	try {
		const res = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		return {
			success: true,
			data: res,
		};
	} catch (error) {
		return {
			success: false,
			message: "Email или пароль неверный",
		};
	}
}

export async function hasUsers() {
	try {
		const users = await prisma.user.findMany();
		return users.length > 0;
	} catch (error) {
		return false;
	}
}
