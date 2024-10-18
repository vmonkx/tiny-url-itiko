import Link from "next/link";

import { EyeIcon } from "lucide-react";

import { getShortUrls } from "@/lib/actions/url.actions";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ButtonCopyUrl } from "./button-copy-url";
import { ButtonEditUrl } from "./button-edit-url";
import { ButtonDeleteUrl } from "./button-delete-url";
import { ButtonGetQR } from "./button-qr-url";

const UrlList = async () => {
	const urls = await getShortUrls();

	const shortenerUrl = (code: string) =>
		`${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

	return (
		<div>
			<h2 className="text-2xl font-bold mb-3">Последние ссылки</h2>
			<div className="space-y-5">
				{urls &&
					urls.map(url => (
						<Card key={url.id}>
							<CardHeader className="flex">
								<CardTitle>{url.comment}</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="flex justify-between">
									<Link
										href={shortenerUrl(url.shortCode)}
										className="text-blue-500"
										target="_blank"
									>
										{shortenerUrl(url.shortCode)}
									</Link>
									<div className="flex items-center gap-3">
										<ButtonCopyUrl url={shortenerUrl(url.shortCode)} />
										<span className="flex items-center gap-1">
											<EyeIcon className="w-4 h-4" />
											{url.visits}
										</span>
									</div>
								</div>
								<div className="flex gap-3">
									<ButtonGetQR url={shortenerUrl(url.shortCode)} />
									<div className="ml-auto flex gap-2">
										<ButtonEditUrl url={url} />
										<ButtonDeleteUrl id={url.id} />
									</div>
								</div>
							</CardContent>
						</Card>
					))}
			</div>
		</div>
	);
};

export default UrlList;
