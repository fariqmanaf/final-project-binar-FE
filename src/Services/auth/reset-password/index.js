export const requestEmailVerification = async (email) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/password-reset`, {
    body: JSON.stringify({ email }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.message);
  }
  return result;
};

export const verifyToken = async (token) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/password-reset/${token}`);

  const result = await response.json();
  if (result.error) {
    throw new Error(result.error.message);
  }
  return result;
};

export const resetPassword = async (token, password) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/password-reset/confirm`, {
    body: JSON.stringify({ token, password }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  if (result.error) {
    throw new Error(result.error.message);
  }
  return result;
};
