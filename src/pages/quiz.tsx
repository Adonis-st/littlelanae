import Head from "next/head";
import { Quiz } from "../components/quiz/Quiz";
import { QuizProvider } from "../utils/contexts/quiz";

export default function QuizPage() {
	return (
		<>
			<Head>
				<title>Quiz</title>
				<meta name="description" content="Quiz" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<QuizProvider>
				<Quiz />
			</QuizProvider>
		</>
	);
}
