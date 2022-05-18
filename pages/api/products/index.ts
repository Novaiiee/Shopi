import { prisma } from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const query = req.query.query as string;

	const products = await prisma.product.findMany({
		where: {
			name: {
				search: query.replace(/[\s\n\t]/g, "_"),
			},
		},
		include: {
			users: false,
		},
	});

	res.json({ products });
}
