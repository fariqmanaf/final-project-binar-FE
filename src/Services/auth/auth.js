export const login = async (request) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    body: JSON.stringify(request),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Login failed");
  }

  return result?.data;
};

export const register = async (data) => {
  console.log(JSON.stringify(data));
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  if (result.error) {
    throw new Error(result?.error.message);
  }

  return result?.data;
};
