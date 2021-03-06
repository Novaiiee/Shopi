import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { ShoppingBag } from "react-feather";
import { SearchBar } from "./SearchBar";

export const Navbar: FC = () => {
	const { data, status } = useSession();

	const isAuthenticated = status === "authenticated";
	const isUnauthenticated = status === "unauthenticated";

	return (
		<div className="sticky">
			<div className="flex items-center justify-between bg-red-500 py-4 px-20 w-screen">
				<div className="flex flex-1">
					<Link href="/">
						<h1 className="text-white font-semibold text-xl">Shopi</h1>
					</Link>
				</div>
				<div className="flex-3">
					<SearchBar />
				</div>
				<div className="justify-end flex flex-1">
					{isAuthenticated && (
						<div className="dropdown dropdown-end space-y-2">
							<div className="flex items-center space-x-8">
								<Link href="/cart">
									<ShoppingBag color="white" />
								</Link>
								<img
									className="rounded-md h-10"
									tabIndex={0}
									src={data?.user?.image ?? ""}
									alt="Your profile pic"
								/>
							</div>
							<ul
								tabIndex={0}
								className="dropdown-content menu p-2 shadow bg-base-100 rounded-md w-52 space-y-6"
							>
								<li>
									<Link href="/account">Account</Link>
									<Link href="/purchases">Order History</Link>
								</li>
								<li>
									<button className="btn text-white" onClick={() => signOut()}>
										Sign Out
									</button>
								</li>
							</ul>
						</div>
					)}
					{isUnauthenticated && (
						<>
							<button className="btn" onClick={() => signIn()}>
								Sign in
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
