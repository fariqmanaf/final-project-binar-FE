export const getTransactionHistory = async (bookingCode, startDate, endDate, page) => {
  let params = {};
  if (bookingCode) {
    params.bookingCode = bookingCode;
  }
  if (startDate) {
    params.startDate = startDate;
  }
  if (endDate) {
    params.endDate = endDate;
  }
  if (page) {
    params.page = page;
  }

  let url = `${import.meta.env.VITE_API_URL}/transactions/me`;
  if (Object.keys(params).length > 0) {
    url += `?${new URLSearchParams(params).toString()}`;
  }

  const response = await fetch(url, {
    method: 'GET',
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
