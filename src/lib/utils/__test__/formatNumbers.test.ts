import { formatNumbers } from '../formatNumbers.js';
import { describe, it, expect } from 'vitest';

const nbsp = String.fromCharCode(160);

// describe('formatNumbers', () => {
//   it('should format number with commas', () => {
//     expect(formatNumbers(123456789)).toBe('123,456,789');
//   })
// })
describe('formatNumbers', () => {
	it('should format number with commas', () => {
		expect(formatNumbers(123456789, { language: 'en' })).toBe('123,456,789');
	});
});
describe('formatNumbers', () => {
	it('should format number with commas', () => {
		expect(formatNumbers(123456789.123, { language: 'en' })).toBe('123,456,789.123');
	});
});
describe('formatNumbers', () => {
	it('should format number with commas', () => {
		expect(formatNumbers(123456789.123, { language: 'en', decimals: 2 })).toBe('123,456,789.12');
	});
});
describe('formatNumbers', () => {
	it('should format number with commas', () => {
		expect(formatNumbers(123456789.123, { language: 'en', decimals: 0 })).toBe('123,456,789');
	});
});
describe('formatNumbers', () => {
	it('should format number with commas', () => {
		expect(formatNumbers(123.123, { language: 'hu' })).toBe('123,123');
	});
});
describe('formatNumbers', () => {
	it('should format number with commas', () => {
		expect(formatNumbers(1234.123, { language: 'hu' })).toBe(`1${nbsp}234,123`);
	});
});
describe('formatNumbers', () => {
	it('should format number with commas', () => {
		expect(formatNumbers(1234.123, { language: 'hu', currency: 'EUR' })).toBe(
			`1${nbsp}234,123${nbsp}EUR`
		);
	});
});
describe('formatNumbers', () => {
	it('should format number with commas', () => {
		expect(formatNumbers(1234.123, { language: 'hu', currency: 'USD' })).toBe(
			`1${nbsp}234,123${nbsp}USD`
		);
	});
});
