import type { CheckboxState } from './CheckboxState.js';

export type CheckboxOption = {
	selected?: CheckboxState;
	label: string;
	value: unknown;
	info?: string;
};
