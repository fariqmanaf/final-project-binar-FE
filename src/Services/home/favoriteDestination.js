export const getFavoriteDestination = async ({ pageParam = {} }, continent) => {
  const { nextCursorId = null } = pageParam;

  let url = `${import.meta.env.VITE_API_URL}/flights/favorites?continent=${continent}&nextCursorId=${nextCursorId}`;

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

  return result;
};
