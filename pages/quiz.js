// import Quiz from '../components/Quiz';
import Quiz from '../components/quiz/Quiz';
import { QuizProvider } from '../utils/contexts/quiz';
// import { QuizProvider } from '../contexts/quiz';

export default function quiz() {
	return (
		<>
			<QuizProvider>
				<Quiz />
			</QuizProvider>
		</>
	);
}
