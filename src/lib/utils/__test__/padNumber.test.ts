import { describe, it, expect } from 'vitest';
import { padNumber } from '../padNumber.js';

describe('padNumber', () => {
	it('padNumber returns a string that contains the number in 2 digits leading zeros, without given minWidth', () => {
		expect(padNumber(2)).toBe('02');
	});

	it('minWidth set to 7 and the number is 22 returns a string that contains the number in 7 digits with 5 pcs leading zeros', () => {
		expect(padNumber(22, 7)).toBe('0000022');
	});

	it('if the minWidth is larger than the number, it returns the number as string', () => {
		expect(padNumber(22222, 3)).toBe('22222');
	});

	it('if the minWidth is larger than the number, it returns the number as string', () => {
		expect(padNumber('22222', 3)).toBe('22222');
	});

	it('if the minWidth is negative than the number, it returns the number as string', () => {
		expect(() => {
			return padNumber(1, -1);
		}).toThrow('minWidth must be greater than 0');
	});
});
