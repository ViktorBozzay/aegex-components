import { getSizeUnit } from './getSizeUnit.js';

export const multiplySize = (size: string, factor: number) => {
	const { size: unitSize, unit } = getSizeUnit(size);
	return `${unitSize * factor}${unit}`;
};
