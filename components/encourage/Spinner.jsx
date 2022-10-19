import { AiOutlineLoading } from 'react-icons/ai';
import react from 'react';

const Spinner = () => {
	return (
		<div className='mx-auto grid h-[80vh] w-full place-content-center'>
			<AiOutlineLoading className='h-20 w-20 animate-spin' />
		</div>
	);
};

export default Spinner;
