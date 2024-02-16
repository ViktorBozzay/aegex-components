export const getDayName = (date: Date, locale: string = 'en', short: boolean = true) => {
	return new Intl.DateTimeFormat(locale, { weekday: short ? 'short' : 'long' }).format(date);
};
