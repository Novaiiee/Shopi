import useDebounce from "@hooks/useDebounce";
import { Product } from "@prisma/client";
import Link from "next/link";
import { FC, useState } from "react";
import { useQuery } from "react-query";

export const SearchBar: FC = () => {
	const [input, setInput] = useState("");
	const query = useDebounce(input, 800);

	const { data, isLoading } = useQuery<Product[]>(["auto-complete-products", query], {
		queryFn: async () => {
			const res = await fetch(`/api/products?query=${query}`);
			const data = await res.json();

			return data.products;
		},
		initialData: [],
		enabled: query.length > 0,
	});

	return (
		<>
			<div className={`dropdown ${input.length > 0 && "dropdown-open"} w-full space-y-2`}>
				<input
					placeholder="Search for a product"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className="input w-full"
				/>
				<ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-md w-full space-y-6">
					{isLoading && <li className="py-2">Loading</li>}
					{!isLoading &&
						data!.length > 0 &&
						data!.map((product) => (
							<li key={product.id} className="py-2">
								<Link href={`/products/${product.id}`}>{product.name}</Link>
							</li>
						))}
					{!isLoading && data!.length == 0 && <li className="py-2">No Results</li>}
				</ul>
			</div>
		</>
	);
};
