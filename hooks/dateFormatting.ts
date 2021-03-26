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
