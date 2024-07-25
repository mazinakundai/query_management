import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Box, Button, Typography } from '@mui/material';
import { fetchQueryDetail, updateQueryStatus } from '../api';

const QueryDetail = ({ handleMarkAsRead }) => {
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    fetchQueryDetail(id).then(response => {
      setQuery(response.data);
    }).catch(error => {
      console.error('Error fetching query:', error);
    });
  }, [id]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  if (!query) {
    return <div>Loading...</div>;
  }

  return (
    <Box>    
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="query detail tabs">
        <Tab label="Details" />
        <Tab label="Payslips" />
        <Tab label="Supporting Documents" />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <Typography variant="h4">{query.query_type}</Typography>
        <Typography variant="h6">{query.employee_name}</Typography>
        <Typography variant="subtitle1">{query.location}</Typography>
        <Typography variant="subtitle2">{new Date(query.date).toLocaleDateString()}</Typography>
        <Button variant="contained" color={query.status === 'open' ? 'primary' : 'secondary'} onClick={handleMarkAsRead}>
          {query.status === 'open' ? 'Mark as Resolved' : 'Mark as Open'}
        </Button>
        <Typography>{query.overview}</Typography>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Typography>{query.details}</Typography>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <Typography>{query.comments}</Typography>
      </TabPanel>
    </Box>
  );
};

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default QueryDetail;
