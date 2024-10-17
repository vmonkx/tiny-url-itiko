"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Copy, Pencil } from "lucide-react";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FormEditUrl } from "./form-edit-url";

type UrlType = {
	id: string;
	shortCode: string;
	originalUrl: string;
	visits: number;
	comment: string;
};
export const ButtonEditUrl = ({ url }: { url: UrlType }) => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Pencil className="w-4 h-4 mr-2" />
					Изменить
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Редактирование</DialogTitle>
					<DialogDescription>
						Вы можете изменить оригинальную ссылку
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<FormEditUrl url={url} toggleClose={setOpen} />
					</div>
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Закрыть
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
