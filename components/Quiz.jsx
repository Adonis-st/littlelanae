import { useContext } from 'react';
import Question from './Question';
import { QuizContext } from '../contexts/quiz';

const Quiz = () => {
	const [quizState, dispatch] = useContext(QuizContext);

	const finalScore = (quizState.correctAnswersCount / quizState.questions.length) * 100;
	return (
		<div className='quiz'>
			{quizState.showResults && (
				<div className='results'>
					<div className='congratulations'>Congratulations!</div>
					<div className='results-info'>
						<p>You have completed the quiz.</p>
						<div>
							<p>Your score</p>
							<h3 className='text-2xl font-black tracking-wide'>{finalScore}%</h3>
						</div>
					</div>
					<div onClick={() => dispatch({ type: 'RESTART' })} className='next-button'>
						Restart
					</div>
				</div>
			)}
			{!quizState.showResults && (
				<div>
					<div className='score'>
						Question {quizState.currentQuestionIndex + 1}/{quizState.questions.length}
					</div>
					<Question />
					{quizState.currentAnswer && (
						<div onClick={() => dispatch({ type: 'NEXT_QUESTION' })} className='next-button'>
							Next question
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Quiz;
