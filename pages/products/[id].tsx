import { Navbar } from "@components/shared/Navbar";
import { prisma } from "@lib/prisma";
import { Product } from "@prisma/client";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import { Rating } from "../../components/shared/Rating";

export const getStaticPaths: GetStaticPaths = async () => {
	const products = await prisma.product.findMany();

	return {
		paths: products.map((product) => ({ params: { id: product.id } })),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
	const product = await prisma.product.findUnique({
		where: {
			id: params!.id as string,
		},
	});

	if (!product) {
		return {
			redirect: "/",
			props: {},
		};
	}

	return {
		props: {
			product: {
				...product,
				price: product.price.toNumber(),
			},
		},
	};
};

export default function ProductsById({ product }: { product: Product }) {
	return (
		<>
			<Head>
				<title>{product.name} - Shopi</title>
			</Head>
			<>
				<Navbar />
				<div className="grid grid-cols-2 w-full h-full px-20 py-4 gap-4">
					<div className="flex justify-center items-center h-full w-full">
						<img src={product.image} alt={`${product.name}'s image`} className="w-9/12" />
					</div>
					<div className="flex flex-col space-y-4">
						<h1 className="text-4xl font-bold">{product.name}</h1>
						<h1 className="text-2xl">
							{Number(product.price) > 0 ? "$" + product.price.toString() : "Free"}
						</h1>
						<Rating rating={product.rating} />
					</div>
				</div>
			</>
		</>
	);
}
