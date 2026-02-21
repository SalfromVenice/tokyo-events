interface TippyProps {
	children: React.ReactNode;
	className: string;
}

export const Tippy: React.FC<TippyProps> = ({ children, className }) => {
	return (
		<div
			className={`rounded-md bg-primary-light dark:bg-primary-dark py-0.5
            px-3.5 absolute border ${className}`}
		>
			<div className='modal-content'>{children}</div>
		</div>
	);
};
