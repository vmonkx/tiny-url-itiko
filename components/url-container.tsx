import React from "react";
import { UrlList } from "./url-list";

import { CreateShortenUrlForm } from "./form-create-url";

export const UrlContainer = () => {
	return (
		<div>
			<CreateShortenUrlForm />
			<UrlList />
		</div>
	);
};
