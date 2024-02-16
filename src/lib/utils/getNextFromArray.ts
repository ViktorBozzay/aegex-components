export const getNextFromArray = <T>(arr: T[], current: T): T => {
	const lengthIdx = arr.indexOf(current);
	const nextElem = arr[(lengthIdx + 1) % arr.length];
	return nextElem;
};
