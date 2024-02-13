import type { DateRange } from '../types/DateRange.js';

export type actions = {
	isNull?: (v: any) => any;
	isDate?: (v: any) => any;
	isDateRange?: (v: any) => any;
	fallback?: (v: any) => any;
};

export const dateTypeBarrier = (
	value: Date | DateRange | null,
	{ isNull, isDate, isDateRange }: actions
): unknown => {
	if (value === null) {
		return isNull?.(value);
	} else if (value instanceof Date) {
		return isDate?.(value);
	} else {
		return isDateRange?.(value);
	}
};
