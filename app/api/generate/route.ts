import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(request: NextRequest) {
	try {
		const { url } = await request.json();

		const qr = await QRCode.toDataURL(url, {
			scale: 10,
			type: "image/png",
			width: 500,
			version: 5,
			color: {
				dark: "#003333",
			},
		});
		return NextResponse.json(`${qr}`);
	} catch (err) {
		console.error(err);
	}
}
