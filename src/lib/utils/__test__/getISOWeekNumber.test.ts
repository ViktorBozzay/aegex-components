import { getISOWeekNumber } from '../getISOWeekNumber.js';
import { describe, it, expect } from 'vitest';

describe('getISOWeekNumber', () => {
	it('should get ISO week number', () => {
		expect(getISOWeekNumber(new Date(2024, 0, 1))).toEqual(1);
	});
	it('should get ISO week number', () => {
		expect(getISOWeekNumber(new Date(2024, 0, 8))).toEqual(2);
	});
});
