import { ListIcon, MapPinLineIcon } from '@phosphor-icons/react';
import { Tippy } from './Tippy';
import { useState } from 'react';

interface TabSelectorProps {
	tab: number;
	setTab: React.Dispatch<React.SetStateAction<number>>;
	disabled: boolean;
}

export const TabSelector: React.FC<TabSelectorProps> = ({
	tab,
	setTab,
	disabled,
}) => {
	const [visible, setVisible] = useState<string | null>(null);

	const tabs = [
		{ icon: <MapPinLineIcon />, label: 'Map' },
		{ icon: <ListIcon />, label: 'List' },
	];

	function isActive(index: number): boolean {
		return tab === index;
	}

	return (
		<div
			className={`h-fit relative w-fit mx-auto ${disabled ? 'pointer-events-none opacity-70' : ''}`}
		>
			<Tippy
				className={
					!visible
						? 'hidden'
						: visible === 'Map'
							? '-left-1.5 -top-8'
							: 'right-0 -top-8'
				}
				children={<p>{visible}</p>}
			/>
			<div className='rounded-lg border border-white/50 grid grid-cols-2 w-fit overflow-hidden mx-auto'>
				{tabs.map(({ icon, label }, index) => (
					<span
						key={index + label}
						className={`px-4 py-2 first:border-r border-white/50 cursor-pointer
                        ${isActive(index) ? 'bg-accent-dark/70' : 'text-white/70'}
                        hover:bg-accent-dark`}
						onClick={() => setTab(index)}
						onMouseEnter={() => setVisible(label)}
						onMouseLeave={() => setVisible(null)}
					>
						{icon}
					</span>
				))}
			</div>
		</div>
	);
};
