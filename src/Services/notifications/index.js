export const getNotifications = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || 'Failed to fetch notifications');
  }

  return result;
};

export const readNotification = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.message || 'Failed to read notification');
  }

  return result;
};

export const readAllNotifications = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications/read-all`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.message || 'Failed to read all notifications');
  }

  return result;
};

export const deleteNotification = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.message || 'Failed to delete notification');
  }

  return result;
};
