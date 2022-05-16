import { PrismaClient, Product } from "@prisma/client";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import { Navbar } from "../../components/shared/Navbar";

const prisma = new PrismaClient();

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
				<title>{product.name} - Zaint</title>
			</Head>
			<Navbar />
			{product.name}
			<p> {product.price.toString()}</p>
		</>
	);
}
