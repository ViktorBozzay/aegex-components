export const daysBetweenDates = (date1: Date, date2: Date): number => {
	const utcDate1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
	const utcDate2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
	const millisecondsPerDay = 24 * 60 * 60 * 1000;
	const timeDifference = Math.abs(utcDate2 - utcDate1);
	const daysDifference = Math.floor(timeDifference / millisecondsPerDay);
	return daysDifference;
};
