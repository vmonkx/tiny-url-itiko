"use client";
import { Trash2Icon } from "lucide-react";
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
import { Button } from "./ui/button";
import { deleteShortUrl } from "@/lib/actions/url.actions";
import { useState } from "react";

export const ButtonDeleteUrl = ({ id }: { id: string }) => {
	const [open, setOpen] = useState(false);

	const handleClickRemove = async () => {
		await deleteShortUrl(id);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Trash2Icon className="w-4 h-4 mr-2" />
					Удалить
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>
						Вы точно хотите удалить эту короткую ссылку?
					</DialogTitle>
					<DialogDescription>
						Восстановить удаленную ссылку невозможно
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2"></div>
				</div>
				<DialogFooter className="sm:justify-start">
					<Button type="button" onClick={handleClickRemove}>
						Удалить
					</Button>
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Отменить
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
