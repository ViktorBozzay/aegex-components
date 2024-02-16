export const getISOWeekNumber = (date: Date) => {
	date.setDate(date.getDate() + 4 - (date.getDay() || 7));
	const yearStart = new Date(date.getFullYear(), 0, 1);
	const weekNumber = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
	return weekNumber;
};
