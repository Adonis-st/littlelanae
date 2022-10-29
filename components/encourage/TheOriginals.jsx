import Image from 'next/image';
import { AiOutlineLine } from 'react-icons/ai';
import data from '../../data/theOrginals';

const TheOriginals = () => {
	return (
		<div className='mx-auto pb-2 sm:w-10/12'>
			<h2 className='my-2 text-center font-["Source_Sans_Pro"] text-2xl font-semibold lg:text-3xl'>
				The Originals
			</h2>

			{data.map((item) => (
				<div
					key={item.key}
					className='mx-auto mb-3 flex w-[88%]  rounded-xl bg-rose-100/[.8] last:mb-10 dark:bg-rose-300/[.5] sm:mb-6'>
					<div className='py-2 pr-2 pl-1'>
						<blockquote className='text-sm text-gray-900 dark:text-gray-800 sm:text-base xl:text-lg'>
							{item.quote}
						</blockquote>
						<div className='flex items-center font-thin'>
							<AiOutlineLine className='mr-1' /> from{' '}
							<span className='ml-1 font-medium xl:text-lg'>{item.title}</span>
						</div>
					</div>
					<div className='order-[-1] w-7 shrink-0 flex-grow-0 select-none p-1 sm:w-14 lg:m-1 lg:w-20'>
						<Image
							src={item.avatar}
							alt={item.alt}
							width={500}
							height={500}
							className='inline-block aspect-square w-full rounded-full object-cover object-top shadow-xl'
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default TheOriginals;
