export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString('ja-JP');
}; 