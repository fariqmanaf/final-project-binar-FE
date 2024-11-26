export const verifOTP = async (data) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/otp/verify`, {
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

export const resendOTP = async (email) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/otp`, {
    method: 'POST',
    body: JSON.stringify({ email }),
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
