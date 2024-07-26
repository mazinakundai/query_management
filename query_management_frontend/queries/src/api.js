import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Adjust the base URL as needed
});

// Get queries
export const fetchQueries = () => api.get('/queries/');

// Get Query by id
export const fetchQueryDetail = (id) => api.get(`/queries/${id}/`);

// Update the query status
export const updateQueryStatus = (query) => {
  return api.put(`/queries/${query.query_id}/`, query);
};
