import Image from 'next/image';
import data from '../..//data/acc';
import Carousel from './Carousel';

const Accomplishments = () => {
	return (
		<div className='mx-auto w-11/12'>
			<h2 className='title text-center text-3xl'>Accomplishments</h2>
			<div className='acc'>
				{data.map((item, index) => {
					return (
						<div key={index} className='acc-card_desktop'>
							<Image
								src={item.imageUrl}
								alt={item.title}
								width={500}
								height={500}
								className='w-full  max-w-full'
							/>
							<div className='h-[200px] lg:h-[300px] '>
								<div className='px-3 pb-4 pt-2 xl:px-6 xl:pt-3 '>
									<h3 className='mb-1 text-center text-xl font-bold capitalize xl:text-3xl'>
										{item.title}
									</h3>
									<p className='text-center font-medium text-gray-900 dark:text-gray-800 lg:text-left lg:text-lg xl:text-xl'>
										{item.description}
									</p>
								</div>
								<div className='hidden rounded-lg px-5 pt-4 pb-2 lg:flex lg:flex-wrap lg:justify-center'>
									<span className='acc-hashtag'>#{item.hashtag.tag1}</span>
									<span className='acc-hashtag'>#{item.hashtag.tag2}</span>
									<span className='acc-hashtag'>#{item.hashtag.tag3}</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<Carousel />
		</div>
	);
};

export default Accomplishments;
