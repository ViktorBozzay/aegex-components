type FormatNumbersProps = {
	language: string;
	decimals: number;
	currency?: string;
};

export const formatNumbers = (
	number: unknown,
	{
		language = 'en',
		currency,
		decimals = 3
	}: Partial<FormatNumbersProps> = {} as FormatNumbersProps
): string | unknown => {
	if (typeof number !== 'number') {
		return number;
	}

	const options: Intl.NumberFormatOptions = {
		minimumFractionDigits: 0,
		maximumFractionDigits: decimals,
		useGrouping: true,
		notation: 'standard'
	};

	if (currency) {
		options.style = 'currency';
		options.currency = currency;
	}

	const formatter = new Intl.NumberFormat(language, options);

	return formatter.format(number);
};
