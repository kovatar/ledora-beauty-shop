export const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(input: string | number | undefined | null): string {
  if (input === undefined || input === null) return '';
  return input
    .toString()
    .replace(/\d/g, (match) => persianDigits[parseInt(match, 10)]);
}

export function formatPrice(price: number): string {
  if (isNaN(price)) return '۰';
  const parts = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return toPersianDigits(parts);
}

export function formatDiscount(percent: number): string {
  return `٪${toPersianDigits(percent)}`;
}
