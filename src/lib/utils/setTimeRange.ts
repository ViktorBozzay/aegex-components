import { createTimeRange } from './createTimeRange.js';
import { TimeRange } from '../constants/timeRange.js';

export const setTimeRange = (
	data: Record<string, unknown>[],
	timeRange: TimeRange,
	timestampKey: string
): Record<string, unknown>[] => {
	if (timeRange === TimeRange.ALL) return data;

	const result = data.reduce((acc: Record<string, unknown>, d: Record<string, unknown>) => {
		const newRange = createTimeRange(d[timestampKey] as string, timeRange);

		const calcValues = () => {
			return Object.entries(d).reduce(
				(obj: Record<string, any>, [key, value]) => {
					if (key !== timestampKey) {
						const valueNum = Number(value);
						const prevVal = obj?.[newRange]?.[key] ?? 0;
						obj[newRange] = {
							...obj[newRange],
							[key]: valueNum + prevVal,
							[timestampKey]: newRange
						};
					}
					return obj;
				},
				{ ...acc }
			);
		};

		return {
			...acc,
			...calcValues()
		};
	}, {});

	return Object.values(result);
};
