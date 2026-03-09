import { MapPinSimpleLineIcon, ShareFatIcon } from '@phosphor-icons/react';
import type { LatLngTuple } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import {
	Circle,
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	Tooltip,
	useMap,
} from 'react-leaflet';
import personIcon from '../assets/icon.svg';
import type { JventT } from '../types';
import { isThemeDark } from '../helpers/theme-helper';

interface MapProps {
	jvents: JventT[];
	center: Record<string, number>;
	setCenter: React.Dispatch<React.SetStateAction<Record<string, number>>>;
	distance: number;
}

export const Map: React.FC<MapProps> = ({
	jvents,
	center,
	setCenter,
	distance,
}) => {
	const pins = jvents.map((j) => ({
		id: j.id,
		lat: j.latitude,
		lng: j.longitude,
		label: j.title,
		url: j.url,
	}));

	const svgIcon = L.icon({
		iconUrl: personIcon, // percorso al tuo SVG
		iconSize: [60, 60], // dimensione in px
		iconAnchor: [30, 60], // punto "attaccato" alla mappa (in basso al centro)
		popupAnchor: [0, -60], // posizione del popup rispetto all'icona
	});

	// centro Tokyo
	const tokyoCenter = { lat: 35.682839, lng: 139.759455 };

	// calcolo bounding box a partire da coordinate centro + raggio
	// (qui esempio: ~20km di raggio)
	const delta = 0.18; // circa 20km in gradi lat/long
	const bounds = L.latLngBounds(
		[tokyoCenter.lat - delta, tokyoCenter.lng - delta], // sud-ovest
		[tokyoCenter.lat + delta, tokyoCenter.lng + delta] // nord-est
	);

	const { lat, lng } = center;

	const mapUrl = isThemeDark()
		? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
		: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

	return (
		<div className='p-4 rounded-md bg-primary-light dark:bg-primary-dark shadow sm:mb-6'>
			<MapContainer
				center={[lat, lng]}
				zoom={13}
				minZoom={11}
				maxZoom={15}
				scrollWheelZoom={false}
				maxBounds={bounds}
				maxBoundsViscosity={1.0}
				style={{ height: '500px', width: '100%' }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url={mapUrl}
				/>
				{pins.map((pin) => (
					<Marker
						key={pin.id}
						position={[pin.lat, pin.lng]}
						riseOnHover
						eventHandlers={{
							mouseover: (e) => e.target.openPopup(),
						}}
					>
						<Popup>
							{pin.label}
							<a
								href={pin.url}
								target='_blank'
								className='flex w-fit items-center gap-1.5 hover:text-accent-dark hover:underline visited:text-accent-light'
							>
								<ShareFatIcon />
								more info
							</a>

							<a
								href={`https://www.google.com/maps/dir/?api=1&destination=${pin.lat},${pin.lng}`}
								target='_blank'
								className='flex w-fit items-center gap-1.5 hover:text-accent-dark hover:underline visited:text-accent-light'
							>
								<MapPinSimpleLineIcon />
								get directions
							</a>
						</Popup>
					</Marker>
				))}
				<Circle
					center={[lat, lng]}
					radius={distance}
					pathOptions={{
						color: '#ff637e', // bordo
						fillColor: '#ff637e', // riempimento
						fillOpacity: 0.2, // trasparenza
					}}
				/>
				<Marker
					position={[lat, lng]}
					draggable
					icon={svgIcon}
					eventHandlers={{
						dragend: (e) => {
							const newCenter = e.target.getLatLng();
							setCenter(newCenter);
						},
						dragstart: (e) => e.target.closeTooltip(),
					}}
				>
					<Tooltip
						className='text-center'
						permanent
						direction='top'
						offset={[0, -60]}
					>
						<p>Drag me around</p>
						<p>to find other events</p>
					</Tooltip>
				</Marker>
				{/* questo ricentra la mappa ogni volta che cambia center */}
				<RecenterOnMarker center={[lat, lng]} />
			</MapContainer>
		</div>
	);
};

const RecenterOnMarker: React.FC<{ center: LatLngTuple }> = ({ center }) => {
	const map = useMap();
	useEffect(() => {
		map.setView(center, map.getZoom()); // aggiorna vista quando cambia il center
	}, [center, map]);
	return null;
};
