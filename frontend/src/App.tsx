import axios from 'axios';
import { useEffect, useState } from 'react';
import {
	Button,
	EventCard,
	Header,
	Map,
	Slider,
	TabSelector,
} from './components';
import type { ApiStatusT, JventT } from './types';
import { getMyPosition } from './helpers/geolocalization-helper';

function App() {
	const baseUrl = import.meta.env.VITE_API_URL;
	const [apiStatus, setApiStatus] = useState<ApiStatusT>('IDLE');
	const [events, setEvents] = useState<Record<string, JventT[]>>({
		all: [],
		free: [],
	});
	const [onlyFree, setOnlyFree] = useState<boolean>(false);
	const [distance, setDistance] = useState<number>(3);
	const tokyoCenter = { lat: 35.682839, lng: 139.759455 };
	const [location, setLocation] =
		useState<Record<string, number>>(tokyoCenter);

	const [tab, setTab] = useState<number>(0);

	useEffect(() => {
		fetchData();
	}, [location, distance]);

	async function fetchData() {
		const { lat, lng } = location;
		setApiStatus('PENDING');
		try {
			const response = await axios.get(
				`${baseUrl}/api/v1/events?lat=${lat}&lng=${lng}&radius=${distance}`,
			);
			const { data } = response;
			const freeEv = data.filter(
				(jev: JventT) => jev.cost === 'FreeEntry',
			);
			setEvents({
				all: data,
				free: freeEv,
			});
			setApiStatus('SUCCESS');
		} catch (error) {
			console.error(error);
			setApiStatus('ERROR');
		}
	}

	if (apiStatus === 'ERROR') return <>NO GOOD</>;

	const eventsVisualized = events[onlyFree ? 'free' : 'all'];

	function toggleFreeEvents() {
		setOnlyFree((prev) => !prev);
	}

	const tabs = [
		<>
			<Slider distance={distance} setDistance={setDistance} />
			<Map
				events={eventsVisualized}
				center={location}
				setCenter={setLocation}
				distance={distance * 1000}
			/>
		</>,
		<>
			{eventsVisualized.map((jvent) => (
				<EventCard key={jvent.id} event={jvent} />
			))}
		</>,
	];

	return (
		<>
			<Header
				eventsFound={
					apiStatus === 'PENDING' ? 0 : eventsVisualized?.length
				}
			/>
			<div
				className={`sticky top-0 mx-auto w-4xl backdrop-blur-sm flex justify-between items-center border border-accent-dark/15 rounded-xl bg-accent-dark/5 p-4`}
			>
				<Button
					disabled={apiStatus !== 'IDLE' && apiStatus !== 'SUCCESS'}
					text={onlyFree ? 'Free Entry' : 'All Events'}
					onClick={toggleFreeEvents}
					hintText={
						onlyFree
							? 'Click to see all events'
							: 'Click to see events with free entry only'
					}
				/>
				<TabSelector
					tab={tab}
					setTab={setTab}
					disabled={apiStatus !== 'IDLE' && apiStatus !== 'SUCCESS'}
				/>
				<Button
					disabled={apiStatus !== 'IDLE' && apiStatus !== 'SUCCESS'}
					text='Get my position'
					onClick={() => getMyPosition(setLocation)}
					hintText='See events near you'
				/>
			</div>
			{tabs[tab]}
		</>
	);
}

export default App;
