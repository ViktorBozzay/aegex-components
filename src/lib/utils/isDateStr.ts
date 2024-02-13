export const isDateStr = (dateStr: string): boolean => {
	const date = new Date(dateStr);
	return !isNaN(date.getTime());
};
