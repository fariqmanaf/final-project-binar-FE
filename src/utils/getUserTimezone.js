export function getUserTimezone() {
  return new Intl.DateTimeFormat('fr', { timeZoneName: 'short' }).formatToParts().find((i) => i.type === 'timeZoneName')
    .value;
}
