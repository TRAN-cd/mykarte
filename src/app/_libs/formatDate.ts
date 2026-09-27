export const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  }).format(date);
};