import { multiplySize } from '../multiplySize.js';
import { describe, it, expect } from 'vitest';

describe('getSizeUnit', () => {
	it('should get size and unit', () => {
		expect(multiplySize('10px', 2)).toEqual('20px');
		expect(multiplySize('10%', 2)).toEqual('20%');
		expect(multiplySize('10rem', 2)).toEqual('20rem');
	});
});
