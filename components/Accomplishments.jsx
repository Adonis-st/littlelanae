import data from '/data/acc.json';
import Carousel from '../components/Carousel';

const Accomplishments = () => {
	return (
		<div className='mx-auto w-11/12'>
			<h2 className='title text-center text-3xl'>Accomplishments</h2>
			<div className='acc hidden gap-x-1 sm:flex lg:gap-x-2 xl:gap-x-4'>
				{data.map((item, index) => {
					return (
						<div className='mx-auto w-full max-w-[450px] overflow-hidden rounded-lg shadow-lg'>
							<img className='max-w-full' src={item.imageUrl} alt={item.title} />
							<div className='h-[200px] lg:h-[300px] '>
								<div className='px-3 pb-4 pt-2 xl:px-5 xl:pt-3 '>
									<h3 className='mb-1 text-center text-xl font-bold capitalize xl:text-3xl'>
										{item.title}
									</h3>
									<p className='text-center text-base text-color-base lg:text-left lg:text-lg  xl:text-[1.5rem]'>
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
