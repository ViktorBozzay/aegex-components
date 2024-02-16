export type Toast = {
	text: string;
	id: string;
	type: 'error' | 'success' | 'warning';
	timeOut: number;
};
