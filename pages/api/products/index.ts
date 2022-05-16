import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const query = req.query.query as string;
	console.log(query);

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
