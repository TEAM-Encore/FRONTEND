import axios from 'axios';

const httpApi = axios.create({
  baseURL: 'http://210.107.205.122:20040',
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

export default httpApi;
