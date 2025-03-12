export function formatDecimal(
  number: number,
  options?: Intl.NumberFormatOptions
) {
  return number.toLocaleString("fi", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    ...options,
  });
}
