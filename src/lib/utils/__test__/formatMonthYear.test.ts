import { formatMonthYear } from '../formatMonthYear.js';
import { describe, it, expect } from 'vitest';

describe('formatMonthYear', () => {
	it('should format month year', () => {
		expect(formatMonthYear(new Date('2022-01-01'), 'en')).toBe('January 2022');
	});
});
