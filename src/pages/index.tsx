import Head from "next/head";
import { Hero } from "../components/home/Hero";
import { Accomplishments } from "../components/home/Accomplishments";
import { Footer } from "../components/home/Footer";

export default function HomePage() {
	return (
		<>
			<Head>
				<title>Little Lanae</title>
				<meta name="description" content="Little Lanae" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Hero />
			<Accomplishments />
			<div className="pb-10" />
			<Footer />
		</>
	);
}
