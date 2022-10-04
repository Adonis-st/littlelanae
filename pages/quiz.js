import Quiz from '../components/Quiz';
import { QuizProvider } from '../contexts/quiz';

export default function quiz() {
	return (
		<>
			<QuizProvider>
				<Quiz />
			</QuizProvider>
		</>
	);
}
