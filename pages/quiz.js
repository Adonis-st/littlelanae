import Quiz from '../components/quiz/Quiz';
import { QuizProvider } from '../utils/contexts/quiz';

export default function quiz() {
	return (
		<>
			<QuizProvider>
				<Quiz />
			</QuizProvider>
		</>
	);
}
