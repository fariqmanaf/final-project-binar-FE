export const getFlightById = async (id, query) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/flights/${id}?returnFlightId=${query}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result;
};

export const createBooking = async (data) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result;
};
