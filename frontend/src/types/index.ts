export type JventT = {
	address: string;
	cost: string;
	created_at: string; // ISO string;
	end_time: string; // ISO string
	id: number;
	image_url: string;
	latitude: number;
	longitude: number;
	start_time: string; // ISO string
	title: string;
	updated_at: string; // ISO string
	url: string;
	venue: string;
};

export type ApiStatusT = 'IDLE' | 'PENDING' | 'ERROR' | 'SUCCESS';
