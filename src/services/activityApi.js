import api from './api';

export async function getActivities(token, date) {
  const response = await api.get(`/activity/${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function subscribeActivity(body, token) {
  const response = await api.post('/activity', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
