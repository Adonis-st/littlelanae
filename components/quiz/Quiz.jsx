import { useContext } from 'react';
import Question from './Question';
import { QuizContext } from '../../utils/contexts/quiz';

const Quiz = () => {
	const [quizState, dispatch] = useContext(QuizContext);

	const finalScore = Math.floor(
		(quizState.correctAnswersCount / quizState.questions.length) * 100
	);
	return (
		<div className='quiz'>
			{quizState.showResults && (
				<div className='results '>
					<div className='results-heading'>
						{finalScore <= 70 ? 'Please try again' : 'congratulations! 🥳'}
					</div>
					<div className='results-info'>
						<p className='text-lg sm:mb-2 sm:text-2xl lg:text-3xl xl:text-4xl'>
							{finalScore <= 70 ? 'You should talk to Ahsha more' : 'You really know Ahsha'}
						</p>
						<div>
							<p className='text-lg font-bold sm:text-xl lg:mb-2 lg:text-2xl xl:text-3xl'>
								Your score
							</p>
							<h3
								className={`text-2xl font-black tracking-wide ${
									finalScore <= 70
										? 'text-red-600'
										: finalScore === 100
										? 'text-lime-500'
										: ''
								}`}>
								{finalScore}
								<span className='text-base font-bold'>%</span>
							</h3>
						</div>
					</div>
					<div onClick={() => dispatch({ type: 'RESTART' })} className='next-button'>
						{finalScore <= 70 ? 'try again' : 'restart'}
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
