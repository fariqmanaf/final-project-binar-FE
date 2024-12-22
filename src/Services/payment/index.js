export const getTransactionById = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/transactions/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result?.data;
};

export const printTicket = async (transactionId) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/transactions/${transactionId}/print`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result;
};
