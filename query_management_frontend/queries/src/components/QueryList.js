import React from 'react';
import {Box, List, ListItem, ListItemText, Divider, Typography} from '@mui/material';
import QueryCard from './QueryCard';

const QueryList = ({ queries, onSelect }) => {
  return (
    <Box sx={{ paddingRight: '16px', borderRight: '1px solid #ccc' }}>
      <List>
        {queries.map(query => (
          <Box sx={{textDecoration: 'none', paddingBottom: '16px', borderBottom: '1px solid #ccc' }}>
            <ListItem button key={query.id} onClick={() => onSelect(query)}>
              <QueryCard query={query} />
            </ListItem>
          </Box>         
        ))}
      </List>
    </Box>
  );
};

export default QueryList;
