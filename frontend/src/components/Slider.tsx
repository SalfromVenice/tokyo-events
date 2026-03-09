import { useState } from 'react';

interface SliderProps {
	distance: number;
	setDistance: React.Dispatch<React.SetStateAction<number>>;
}

export const Slider: React.FC<SliderProps> = ({ distance, setDistance }) => {
	const [value, setValue] = useState<number>(distance);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const newDistanceRange: number = +event.target.value;
		setValue(newDistanceRange);
	}

	return (
		<div className='grid grid-cols-2 items-center gap-x-2 mt-2.5 mx-auto '>
			<label className='ml-auto min-w-[12rem]' htmlFor='distance'>
				Radius distance ({value} km)
			</label>
			<input
				className='max-w-xs'
				type='range'
				id='distance'
				name='distance'
				min={1.5}
				max={15}
				step={0.5}
				value={value}
				onChange={handleChange}
				onMouseUp={(e) =>
					setDistance(+(e.target as HTMLInputElement).value)
				}
				onTouchEnd={(e) =>
					setDistance(+(e.target as HTMLInputElement).value)
				}
			/>
		</div>
	);
};
