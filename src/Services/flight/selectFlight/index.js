export const getFlightByQuery = async (querySearch, page = 1) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/flights?${querySearch}&page=${page}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || 'Failed to fetch flights');
  }

  return result;
};
