import api from './api';

async function postCode(code) {
  const response = await api.post(`/oauth/github/login/${code}`);
  return response;
}

const gitHubApi = {
  postCode,
};

export default gitHubApi;
