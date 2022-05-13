import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	const { data, status } = useSession();

	if (status == "loading") {
		return <div>Loading</div>;
	} else if (status == "authenticated") {
		return <div>{data.user?.name}</div>;
	} else {
		return (
			<div className={styles.container}>
				<button onClick={() => signIn()}>Click</button>
			</div>
		);
	}
};

export default Home;
