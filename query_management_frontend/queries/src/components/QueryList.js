import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography} from '@mui/material';
import QueryCard from './QueryCard';

const QueryList = ({ queries, onSelect }) => {
  return (
    <List>
      {queries.map(query => (
        <ListItem key={query.id} onClick={() => onSelect(query)}>
          <QueryCard query={query} />
          <Divider/>
        </ListItem>
      ))}
    </List>
  );
};

export default QueryList;
