export const getMonthName = (date: Date, locale: string = 'en') => {
	return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
};
