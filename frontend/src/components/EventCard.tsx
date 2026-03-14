import {
	BuildingOfficeIcon,
	CalendarDotsIcon,
	CoinsIcon,
	MapPinLineIcon,
	ShareFatIcon,
} from '@phosphor-icons/react';
import { useState } from 'react';
import type { JventT } from '../types';

interface EventCardProps {
	event: JventT;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
	const [imageStatus, setImageStatus] = useState<
		'loaded' | 'error' | 'loading'
	>('loading');

	const {
		address,
		latitude,
		longitude,
		cost,
		end_time,
		image_url,
		start_time,
		title,
		url,
		venue,
	} = event;

	return (
		<div
			className={`bg-primary-light dark:bg-primary-dark my-4 grid sm:grid-cols-[3fr_2fr]
            overflow-hidden sm:rounded-md sm:mx-4`}
		>
			<span className='flex flex-col justify-between py-4 px-6 order-2 sm:order-1'>
				<span className='sm:grid grid-cols-[1fr_auto] items-baseline gap-3.5'>
					<h2>{title}</h2>
					<a
						href={url}
						target='_blank'
						className='flex w-fit items-center gap-1.5 hover:text-accent-dark hover:underline visited:text-accent-light'
					>
						<ShareFatIcon />
						more info
					</a>
				</span>
				<span className='flex items-center gap-2'>
					<CalendarDotsIcon />
					{new Date(start_time).toLocaleDateString()} -{' '}
					{new Date(end_time).toLocaleDateString()}
				</span>
				<section>
					<span className='grid grid-cols-[auto_1fr] gap-x-2 items-baseline'>
						<MapPinLineIcon className='translate-y-0.5' />
						<a
							href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&zoom=5`}
							target='_blank'
							className='grid hover:text-accent-dark hover:underline cursor-alias'
						>
							<p>{address}</p>
						</a>
					</span>
				</section>
				<section className='flex items-center gap-2'>
					<BuildingOfficeIcon className='-translate-y-0.5' />
					<p>{venue}</p>
				</section>
				<p
					className={`${
						cost === 'FreeEntry'
							? 'rounded py-1 px-2.5 font-bold text-white bg-accent-dark w-fit drop-shadow-black'
							: ''
					} flex items-center gap-x-2`}
				>
					<CoinsIcon />
					{cost === 'FreeEntry' ? 'Free Entry' : cost}
				</p>
			</span>
			{imageStatus === 'loading' && (
				<div className='aspect-video sm:aspect-auto h-full order-1 sm:order-2 w-full bg-accent-dark/50 animate-pulse' />
			)}
			{imageStatus === 'error' && (
				<div className='aspect-video sm:aspect-auto h-full order-1 sm:order-2 w-full bg-accent-dark/25' />
			)}
			<img
				style={{ objectFit: 'cover' }}
				className='aspect-video sm:aspect-auto h-full order-1 sm:order-2 w-full'
				loading='lazy'
				src={image_url}
				alt='event image'
				onLoad={() => setImageStatus('loaded')}
				onError={() => setImageStatus('error')}
			/>
		</div>
	);
};
