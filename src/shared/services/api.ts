import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_API_ACCESS_TOKEN}`,
  },
});

export default api;
