import { Product } from "@prisma/client";
import { FC } from "react";
import { ProductDisplay } from "./ProductDisplay";

interface ProductsListProps {
	products: Product[];
}

export const ProductsList: FC<ProductsListProps> = ({ products }) => {
	return (
		<div className="m-10 gap-6 grid-cols-5 grid">
			{products.map((product) => (
				<ProductDisplay product={product} key={product.id} />
			))}
		</div>
	);
};
