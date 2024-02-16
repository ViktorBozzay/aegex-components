import { getMonthName } from '../getMonthName.js';
import { describe, it, expect } from 'vitest';

describe('getMonthName', () => {
	it('should get month name', () => {
		expect(getMonthName(new Date('2022-01-01'), 'en')).toBe('January');
	});
	it('should get month name', () => {
		expect(getMonthName(new Date('2022-01-01'), 'fr')).toBe('janvier');
	});
	it('should get month name', () => {
		expect(getMonthName(new Date('2022-01-01'), 'es')).toBe('enero');
	});
	it('should get month name', () => {
		expect(getMonthName(new Date('2022-10-01'), 'en')).toBe('October');
	});
	it('should get month name', () => {
		expect(getMonthName(new Date('2022-10-01'), 'fr')).toBe('octobre');
	});
	it('should get month name', () => {
		expect(getMonthName(new Date('2022-10-01'), 'es')).toBe('octubre');
	});
});
