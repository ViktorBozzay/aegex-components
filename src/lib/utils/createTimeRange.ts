import { TimeRange } from '../constants/timeRange.js';
import { getISOWeekNumber } from './getISOWeekNumber.js';
import { padNumber } from './padNumber.js';

export const createTimeRange = (timeString: string, timeRange: TimeRange) => {
	if (TimeRange.ALL === timeRange) return timeString;
	const date = new Date(timeString);
	if (date.toString() === 'Invalid Date') {
		throw new Error('Invalid Date');
	}

	const year = date.getFullYear();
	const month = padNumber(date.getMonth() + 1);
	const day = padNumber(date.getDate());
	const hour = padNumber(date.getHours());
	const minute = padNumber(date.getMinutes());
	const calendarWeek = getISOWeekNumber(date);

	const recipe: Record<TimeRange, string> = {
		[TimeRange.YEAR]: `${year}`,
		[TimeRange.MONTH]: `${year}-${month}`,
		[TimeRange.WEEK]: `${calendarWeek}`,
		[TimeRange.DAY]: `${year}-${month}-${day}`,
		[TimeRange.HOUR]: `${year}-${month}-${day} ${hour}:00`,
		[TimeRange.MINUTE]: `${year}-${month}-${day} ${hour}:${minute}`
	};

	return recipe[timeRange];
};
