export function TimeStampConverter(departureTimestamp, arrivalTimestamp) {
  const departureDatetime = new Date(departureTimestamp);
  const departureDate = departureDatetime.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const departureTime = departureDatetime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const arrivalDatetime = new Date(arrivalTimestamp);
  const arrivalDate = arrivalDatetime.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const arrivalTime = arrivalDatetime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return {
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
  };
}
