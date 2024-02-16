import { isDateStr } from '../isDateStr.js';
import { describe, it, expect } from 'vitest';

describe('isDateStr', () => {
	it('should return true for valid date', () => {
		expect(isDateStr('2022-01-01')).toBe(true);
	});
	it('should return true for date', () => {
		expect(isDateStr('2022-01-01 13:22:21')).toBe(true);
	});
	it('should return true for date', () => {
		expect(isDateStr('2022-01-01 13:22')).toBe(true);
	});
	it('should return true for date', () => {
		expect(isDateStr('2022-01-01 13:22:21.123')).toBe(true);
	});
});
