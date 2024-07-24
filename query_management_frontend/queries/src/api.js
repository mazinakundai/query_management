import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Adjust the base URL as needed
});

export const fetchQueries = () => api.get('/queries/');
export const fetchQueryDetail = (id) => api.get(`/queries/${id}/`);
