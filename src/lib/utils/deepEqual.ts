export const deepEqual = (a: unknown, b: unknown): boolean => {
	if (a === b && typeof a === typeof b) {
		return true;
	}

	if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
		return false;
	}

	const keysA = Object.keys(a);
	const keysB = Object.keys(b);

	if (keysA.length !== keysB.length) {
		return false;
	}

	for (const key of keysA) {
		if (!keysB.includes(key) || !deepEqual(a[key as keyof typeof a], b[key as keyof typeof b])) {
			return false;
		}
	}

	return true;
};
