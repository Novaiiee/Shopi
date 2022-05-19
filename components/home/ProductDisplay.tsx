import { Product } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

interface ProductDisplayProps {
	product: Product;
}

export const ProductDisplay: FC<ProductDisplayProps> = ({ product }) => {
	return (
		<Link href={`/products/${product.id}`}>
			<div className="shadow-2xl rounded-md border-1">
				<img
					className="h-72 w-full object-scale-down rounded-t-md"
					src={product.image}
					alt={`${product.name} display image`}
				/>
				<div className="p-5 rounded-md">
					<h1 className="font-semibold text-2xl mb-3">
						{product.name}
					</h1>
					<h1>
						<>Price: {Number(product.price) > 0 ? `$${product.price.toString()}` : "Free"}</>
					</h1>
				</div>
			</div>
		</Link>
	);
};
