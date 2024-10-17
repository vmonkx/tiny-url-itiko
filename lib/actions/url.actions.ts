"use server";

import { nanoid } from "nanoid";
import prisma from "../db";
import { CreateShortUrlSchema } from "../validator";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export async function createShortUrl(data: FormData) {
	try {
		const { url, comment } = Object.fromEntries(data) as {
			url: string;
			comment: string;
		};

		const shortCode = nanoid(5);

		const shortenedUrl = await prisma.url.create({
			data: {
				originalUrl: url,
				shortCode,
				comment: comment,
			},
		});

		revalidatePath("page");

		return {
			success: true,
			message: "Shortened url successfully",
		};
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				success: false,
				message: error?.issues[0]?.message,
			};
		} else {
			return {
				success: false,
				message: "Something went wrong",
			};
		}
	}
}

export const getShortUrls = async () => {
	try {
		const urls = await prisma.url.findMany({
			orderBy: { createdAt: "desc" },
		});
		return urls;
	} catch (error) {
		console.error("Error", error);
	}
};

export async function editShortUrl(data: FormData) {
	try {
		const { id, originalUrl, comment } = Object.fromEntries(data) as {
			id: string;
			originalUrl: string;
			comment: string;
		};

		const editedUrl = await prisma.url.update({
			where: { id },
			data: {
				originalUrl,
				comment,
			},
		});

		revalidatePath("page");
		return editedUrl;
	} catch (error) {
		console.error("Error", error);
	}
}

export async function deleteShortUrl(id: string) {
	try {
		const deletedUrl = await prisma.url.delete({ where: { id } });
		revalidatePath("page");
		return deletedUrl;
	} catch (error) {
		console.error("Error", error);
	}
}
