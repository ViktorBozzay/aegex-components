import { isValidDate } from '../isValidDate.js';
import { describe, it, expect } from 'vitest';

describe('isValidDate', () => {
	it('should return true for valid date', () => {
		expect(isValidDate(new Date())).toBe(true);
	});
	it('should return false for invalid date', () => {
		expect(isValidDate(null)).toBe(false);
	});
});
