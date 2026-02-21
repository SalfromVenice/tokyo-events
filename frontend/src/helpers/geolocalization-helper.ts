// centro Tokyo
const tokyoCenter = { lat: 35.682839, lng: 139.759455 };

// calcolo bounding box a partire da coordinate centro + raggio
// (qui esempio: ~20km di raggio)
const delta = 0.18; // circa 20km in gradi lat/long

function isInTokyo(lat: number, lng: number): boolean {
	return (
		lat >= tokyoCenter.lat - delta &&
		lat <= tokyoCenter.lat + delta &&
		lng >= tokyoCenter.lng - delta &&
		lng <= tokyoCenter.lng + delta
	);
}

export function getMyPosition(
	setLocation: React.Dispatch<React.SetStateAction<Record<string, number>>>
) {
	if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const lat = pos.coords.latitude;
				const lng = pos.coords.longitude;
				isInTokyo(lat, lng)
					? setLocation({ lat, lng })
					: console.log('Hmm… seems like you’re not in Tokyo.');
			},
			(err) => {
				console.error('Errore:', err.message);
			},
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
		);
	} else {
		console.warn('Geolocation not supported by this browser.');
	}
}
