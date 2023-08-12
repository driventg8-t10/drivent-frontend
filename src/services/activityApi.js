import api from './api';

export async function getActivities(token, date) {
  const response = await api.get(`/activity/${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
