export const getFlightData = async (
  departureAirportId,
  destinationAirportId,
  departureDate,
  returnDate,
) => {
  let params = {};
  if (departureAirportId) {
    params.departureAirportId = departureAirportId;
  }
  if (destinationAirportId) {
    params.destinationAirportId = destinationAirportId;
  }
  if (departureDate) {
    params.departureDate = departureDate;
  }
  if (returnDate) {
    params.returnDate = returnDate;
  }

  let url = `${import.meta.env.VITE_API_URL}/flights?` + new URLSearchParams(params);

  const response = await fetch (url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};

export const getFlightDataById = async (id) => {
  let url = `${import.meta.env.VITE_API_URL}/flights/${id}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};
