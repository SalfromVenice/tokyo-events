interface HeaderProps {
	eventsFound: number;
}

export const Header: React.FC<HeaderProps> = ({ eventsFound }) => {
	return (
		<div className='text-center mt-6'>
			<h1>Find events in Tōkyō</h1>
			<p>{eventsFound} events found around you</p>
		</div>
	);
};
