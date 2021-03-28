export function isDateBeforeToday(date: Date) {
  return new Date(date.toDateString()) < new Date(new Date().toDateString());
}

export function formatDate(date: Date) {
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
}

export function formatTime(date: Date) {
  return (
    (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) +
    ':' +
    (date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes())
  );
}

export function formatMonthYear(date: string) {
  console.log('date', date, typeof date);
  return (
    new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(date)) +
    ' ' +
    new Date(date).getFullYear()
  );
}
