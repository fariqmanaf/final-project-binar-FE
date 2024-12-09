export const getFavoriteDestination = async (continent, nextCursor) => {
  let params = {};
  if (continent) {
    params["search[continent]"] = continent;
  }

  let url = `${import.meta.env.VITE_API_URL}/flights/favorites?` + new URLSearchParams(params);

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};
