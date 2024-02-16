export const formatMonthYear = (date: Date, locale: string = 'en-US') => {
	const options = { year: 'numeric', month: 'long' };
	const formatter = new Intl.DateTimeFormat(locale, options);
	return formatter.format(date);
};
