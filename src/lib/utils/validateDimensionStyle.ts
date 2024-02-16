const defaultValidDimensionStyles = ['%', 'rem', 'em', 'px'];

export const validateDimensionStyle = (
	style: string,
	validDimensionStyles: string[] = defaultValidDimensionStyles
): boolean => {
	return validDimensionStyles.some((dimStr) => style.endsWith(dimStr));
};
