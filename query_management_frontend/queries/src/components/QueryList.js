// QueryList.js
import React, { useState, useEffect } from 'react';
import { List } from '@mui/material';
import { fetchQueries } from '../api';
import QueryCard from './QueryCard';

const QueryList = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    fetchQueries().then(response => {
      setQueries(response.data);
    }).catch(error => {
      console.error('Error fetching queries:', error);
    });
  }, []);

  return (
    <List>
      {queries.map(query => (
        <QueryCard key={query.id} query={query} />
      ))}
    </List>
  );
};

export default QueryList;
