export const padNumber = (number: number | string, minWidth: number = 2): string => {
  if (minWidth <= 0) throw new Error('minWidth must be greater than 0');
  const paddedNumber = typeof number === 'number' ? String(number) : number;
  const paddingSize = Math.max(0, minWidth - paddedNumber.length);
  const padding = '0'.repeat(paddingSize);

  return padding + paddedNumber;
};
