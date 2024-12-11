export const getFavoriteDestination = async (continent, nextCursor) => {
  const validContinents = ['ASIA', 'EUROPE', 'AFRICA', 'AMERICA', 'AUSTRALIA'];

  let url = `${import.meta.env.VITE_API_URL}/flights/favorites`;

  if (continent) {
    if (!validContinents.includes(continent)) {
      throw new Error(
        `Invalid continent value. Expected one of ${validContinents.join(', ')}, received '${continent}'`
      );
    }
    url += `?continent=${encodeURIComponent(continent)}`;
  }

  if (nextCursor) {
    url += `${continent ? '&' : '?'}nextCursor=${encodeURIComponent(nextCursor)}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.message || 'Failed to fetch favorite destinations');
  }

  return result?.data;
};
