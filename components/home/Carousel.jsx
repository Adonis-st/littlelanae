import { Carousel as Slider } from 'flowbite-react';
import data from '../../data/acc.json';

const Carousel = () => {
	return (
		<div className='h-[670px]  sm:hidden'>
			<Slider indicators={false}>
				{data.map((item, index) => {
					return (
						<div key={index}>
							<div className='rounded-lg shadow-lg'>
								<img className='rounded-lg' src={item.imageUrl} alt={item.title} />
								<div className='h-[155px] px-6 py-4'>
									<h3 className='mb-2 text-center text-xl font-bold capitalize'>
										{item.title}
									</h3>
									<p className={'text-center text-base text-color-base'}>
										{item.description}
									</p>
								</div>
								<div className='rounded-lg px-6 pt-4 pb-2'>
									<span className='acc-hashtag'>#gym</span>
									<span className='acc-hashtag'>#fitness</span>
									<span className='acc-hashtag'>#motivated</span>
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
