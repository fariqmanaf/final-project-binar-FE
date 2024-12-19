export const fetchUserData = async (token) => {
  const response = await fetch('https://api.tiketku.risalamin.com/users/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const result = await response.json();
  if (result && result.data) {
    return result.data;
  } else {
    throw new Error('Invalid response format');
  }
};

export const updateUserProfile = async (token, name, phoneNumber) => {
  const response = await fetch('https://api.tiketku.risalamin.com/users/me', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      phoneNumber,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to save user data');
  }

  const result = await response.json();
  return result;
};
