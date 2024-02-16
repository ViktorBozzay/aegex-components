import { getSizeUnit } from '../getSizeUnit.js';
import { describe, it, expect } from 'vitest';

describe('getSizeUnit', () => {
	it('should get size and unit', () => {
		expect(getSizeUnit('10px')).toEqual({ size: 10, unit: 'px' });
		expect(getSizeUnit('10%')).toEqual({ size: 10, unit: '%' });
		expect(getSizeUnit('10rem')).toEqual({ size: 10, unit: 'rem' });
		expect(getSizeUnit(10)).toEqual({ size: 10, unit: 'px' });
		expect(getSizeUnit('MafaDaka')).toEqual({ size: 1, unit: 'rem' });
	});
});
