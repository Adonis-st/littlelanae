import { Carousel as Slider } from 'flowbite-react';
import data from '../../data/acc';

const Carousel = () => {
	return (
		<div className='h-[670px]  sm:hidden'>
			<Slider indicators={false}>
				{data.map((item, index) => {
					return (
						<div key={index}>
							<div className='rounded-lg shadow-lg'>
								<img
									className='rounded-lg shadow-md'
									src={item.imageUrl}
									alt={item.title}
								/>
								<div className='h-[155px] px-6 py-4'>
									<h3 className='mb-1 text-center text-2xl font-bold capitalize'>
										{item.title}
									</h3>
									<p className='text-center font-medium text-gray-900'>
										{item.description}
									</p>
								</div>
								<div className=' flex justify-around rounded-lg px-6 pt-4 pb-[1.25rem] '>
									<span className='acc-hashtag'>#{item.hashtag.tag1}</span>
									<span className='acc-hashtag'>#{item.hashtag.tag2}</span>
									<span className='acc-hashtag'>#{item.hashtag.tag3}</span>
								</div>
							</div>
						</div>
					);
				})}
			</Slider>
		</div>
	);
};

export default Carousel;
