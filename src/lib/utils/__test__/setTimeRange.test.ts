import { describe, it, expect } from 'vitest';
import { setTimeRange } from '../setTimeRange.js';
import { TimeRange } from '$lib/constants/timeRange.js';

const data: Record<string | number, number | string>[] = [
	{ timestamp: '2020-01-01 12:00', net: 100, cogs: 50, gm: 50 },
	{ timestamp: '2020-01-01 12:01', net: 50, cogs: 100, gm: 75 },
	{ timestamp: '2020-01-02 12:00', net: 55, cogs: 65, gm: 100 },
	{ timestamp: '2020-01-02 12:01', net: 120, cogs: 55, gm: 42 },
	{ timestamp: '2020-03-01 12:00', net: 125, cogs: 57, gm: 42 },
	{ timestamp: '2020-03-01 12:01', net: 123, cogs: 59, gm: 40 },
	{ timestamp: '2021-01-01 12:00', net: 132, cogs: 55, gm: 32 }
];

describe('setTimeRange', () => {
	it('should set time range', () => {
		expect(setTimeRange([], TimeRange.DAY, 'timestamp')).toEqual([]);
	});
});
