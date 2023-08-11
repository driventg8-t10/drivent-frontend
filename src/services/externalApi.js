import axios from 'axios';

const instance = (url) => axios.create({
  baseURL: url
});

export default instance;
