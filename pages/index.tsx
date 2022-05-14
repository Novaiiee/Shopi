import type { NextPage } from "next";
import { Navbar } from "../components/shared/Navbar";

export const getServerSideProps = async () => {
	return { props: {} };
};

const Home: NextPage = () => {
	return (
		<>
			<Navbar />
		</>
	);
};

export default Home;
