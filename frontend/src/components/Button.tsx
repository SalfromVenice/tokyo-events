import { useState } from 'react';
import { Tippy } from './Tippy';

interface ButtonProps {
	text: string;
	onClick: () => void;
	hintText: string;
	className?: string;
	disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	text,
	onClick,
	hintText,
	className,
	disabled,
}) => {
	const [visible, setVisible] = useState<boolean>(false);

	return (
		<button
			className={`rounded-md px-2.5 bg-accent-dark text-white min-w-32
            hover:bg-[#f93a60] cursor-pointer py-1.5 active:bg-accent-light
            relative ${className}`}
			type='button'
			onClick={onClick}
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}
			disabled={disabled}
		>
			<Tippy
				children={hintText}
				className={
					!visible
						? 'hidden'
						: 'text-primary-dark dark:text-accent-dark -translate-x-1/2 left-1/2 bottom-10 min-w-32'
				}
			/>
			{text}
		</button>
	);
};
