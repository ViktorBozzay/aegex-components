import { daysBetweenDates } from '../daysBetweenDates.js';
import { describe, it, expect } from 'vitest';

const date1 = new Date(2022, 1, 1);
const date2 = new Date(2022, 1, 31);
const date3 = new Date(2022, 1, 21);

describe('daysBetweenDates', () => {
	it('days between dates', () => {
		expect(daysBetweenDates(date1, date2)).toBe(30);
	});
	it('days between dates reversed', () => {
		expect(daysBetweenDates(date2, date1)).toBe(30);
	});
	it('days between dates', () => {
		expect(daysBetweenDates(date1, date3)).toBe(20);
	});
	it('days between dates reversed', () => {
		expect(daysBetweenDates(date3, date1)).toBe(20);
	});
	it('days between dates', () => {
		expect(daysBetweenDates(date2, date3)).toBe(10);
	});
	it('days between dates reversed', () => {
		expect(daysBetweenDates(date3, date2)).toBe(10);
	});
});
