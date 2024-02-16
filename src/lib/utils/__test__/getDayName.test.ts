import { getDayName } from '../getDayName.js';
import { describe, it, expect } from 'vitest';

describe('getDayName', () => {
	it('should get day name', () => {
		expect(getDayName(new Date('2022-01-01'), 'en')).toBe('Sat');
	});
	it('should get day name', () => {
		expect(getDayName(new Date('2022-01-02'), 'en')).toBe('Sun');
	});
	it('should get day name', () => {
		expect(getDayName(new Date('2022-01-01'), 'hu-HU')).toBe('Szo');
	});
	it('should get day name', () => {
		expect(getDayName(new Date('2022-01-02'), 'hu-HU')).toBe('V');
	});
	it('should get day name', () => {
		expect(getDayName(new Date('2022-01-01'), 'hu-HU', false)).toBe('szombat');
	});
	it('should get day name', () => {
		expect(getDayName(new Date('2022-01-02'), 'hu-HU', false)).toBe('vasárnap');
	});
});
