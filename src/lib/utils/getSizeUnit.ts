const regex = /^(\d*\.?\d+)\s*([a-zA-Z%]+)$/;

export const getSizeUnit = (str: string | number): { size: number; unit: string } => {
	if (typeof str === 'number') {
		return { size: str, unit: 'px' };
	} else {
		const match = str.match(regex);
		if (match) {
			const [, value, unit] = match;
			return { size: parseFloat(value), unit };
		}
	}
	return { size: 1, unit: 'rem' };
};
