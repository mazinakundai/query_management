import React from 'react';
import { List, ListItem } from '@mui/material';
import QueryCard from './QueryCard';

const QueryList = ({ queries }) => {
  return (
    <List>
      {queries.map(query => (
        <ListItem key={query.query_id}>
          <QueryCard query={query} />
        </ListItem>
      ))}
    </List>
  );
};

export default QueryList;
