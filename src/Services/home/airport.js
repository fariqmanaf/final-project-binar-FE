export const getAirportData = async () => {
  let url = `${import.meta.env.VITE_API_URL}/airports`;

  const response = await fetch(url, {
    method: 'GET',
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result?.data;
};

export const getAirportDataById = async (id) => {
  let url = `${import.meta.env.VITE_API_URL}/airports/${id}`;

  const response = await fetch(url, {
    method: 'GET',
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result?.data;
};
