import React from 'react';
import { Box, List, ListItem, Grid } from '@mui/material';
import QueryCard from './QueryCard';

const QueryList = ({ queries, onSelect }) => {
  return (
    <Grid item xs={12} md={12} sx={{ paddingRight: { md: '16px' }, borderRight: { md: '2px solid #ccc' } }}>
      <List>
        {queries.map(query => (
          <Box sx={{paddingBottom: '16px', borderBottom: '2px solid #ccc' }} key={query.id}>
            <ListItem button onClick={() => onSelect(query)}>
              <QueryCard query={query} />
            </ListItem>
          </Box>
        ))}
      </List>
    </Grid>
  );
};

export default QueryList;
