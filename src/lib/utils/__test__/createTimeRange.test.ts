import { expect, test } from 'vitest';

import { createTimeRange } from '../createTimeRange.js';
import { TimeRange } from '../../constants/timeRange.js';

test('createTimeRange returns a valid date string that contains year only', () => {
	const result = createTimeRange('2023-01-01', TimeRange.YEAR);
	expect(result).toBe('2023');
});

test('createTimeRange returns a valid date string that contains year-month only', () => {
	const result = createTimeRange('2023-01-01', TimeRange.MONTH);
	expect(result).toBe('2023-01');
});

test('createTimeRange returns a valid date string that contains date only', () => {
	const result = createTimeRange('2023-01-01', TimeRange.DAY);
	expect(result).toBe('2023-01-01');
});

test('createTimeRange returns a valid date string that contains date + hour (minutes will be 0) only', () => {
	const result = createTimeRange('2023-01-01 13:45:21', TimeRange.HOUR);
	expect(result).toBe('2023-01-01 13:00');
});

test('createTimeRange returns a valid date string that contains date + hour:minutes', () => {
	const result = createTimeRange('2023-01-01 13:45:21', TimeRange.MINUTE);
	expect(result).toBe('2023-01-01 13:45');
});

test('createTimeRange returns a valid date string that contains year and calendar week number', () => {
	const result = createTimeRange('2023-01-02 13:45:21', TimeRange.WEEK);
	expect(result).toBe('1');
});

test('if the minWidth is negative than the number, it returns the number as string', () => {
	expect(() => {
		return createTimeRange('MAFADAKA', TimeRange.MINUTE);
	}).toThrow('Invalid Date');
});
