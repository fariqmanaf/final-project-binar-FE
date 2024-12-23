export function getUserTimezone() {
  return Intl.DateTimeFormat('fr', { timeZoneName: 'short' })
    .formatToParts()
    .find((i) => i.type === 'timeZoneName')
    .value.slice(3);
}
