export type FormField = {
	name: string;
	value: unknown;
	label: string;
	info: string;
	icon: string;
	type: keyof InputType;
};
