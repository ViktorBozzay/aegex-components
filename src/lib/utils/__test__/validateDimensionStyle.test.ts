import { validateDimensionStyle } from '../validateDimensionStyle.js';
import { describe, it, expect } from 'vitest';

describe('validateDimensionStyle', () => {
	it('10px okay', () => {
		expect(validateDimensionStyle('10rem')).toBe(true);
	});
	it('10% okay', () => {
		expect(validateDimensionStyle('10%')).toBe(true);
	});
	it('10px okay', () => {
		expect(validateDimensionStyle('10px')).toBe(true);
	});
});

describe('validateDimensionStyle failing test', () => {
	it('rem10 not okay', () => {
		expect(validateDimensionStyle('rem10')).toBe(false);
	});
	it('%10 not okay', () => {
		expect(validateDimensionStyle('%10')).toBe(false);
	});
	it('px10 not okay', () => {
		expect(validateDimensionStyle('px10')).toBe(false);
	});
	it('10rem10 not okay', () => {
		expect(validateDimensionStyle('10rem10')).toBe(false);
	});
	it('10%10 not okay', () => {
		expect(validateDimensionStyle('10%10')).toBe(false);
	});
	it('10px10 not okay', () => {
		expect(validateDimensionStyle('10px10')).toBe(false);
	});
});
