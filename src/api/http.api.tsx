import axios from 'axios';

const httpApi = axios.create({
  baseURL: 'http://15.165.198.52:8080',
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

export default httpApi;
