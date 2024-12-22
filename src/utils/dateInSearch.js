export function getDatesAround(baseDate, before, after) {
  const dates = [];
  for (let i = -before; i <= after; i++) {
    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() + i);
    dates.push(newDate);
  }
  return dates;
}

export function formatDate(date) {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`;
}

export function formatLocaleDate(date) {
  return date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export function dateToString(date) {
  return date.toISOString().split('T')[0];
}
