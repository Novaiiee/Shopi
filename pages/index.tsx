import { ProductsList } from "@components/home/ProductsList";
import { Navbar } from "@components/shared/Navbar";
import { prisma } from "@lib/prisma";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";

export const getServerSideProps = async () => {
	const products = await prisma.product.findMany({
		take: 10,
	});

	return { props: { products: products.map((p) => ({ ...p, price: Number(p.price) })) } };
};

const Home: NextPage<{ products: Product[] }> = ({ products }) => {
	return (
		<>
			<Head>
				<title>Zaint</title>
			</Head>
			<Navbar />
			<ProductsList products={products} />
		</>
	);
};

export default Home;
