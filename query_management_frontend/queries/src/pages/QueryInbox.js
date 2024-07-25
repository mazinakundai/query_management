import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Grid, Typography } from '@mui/material';
import { fetchQueries, updateQueryStatus } from '../api';
import Sidebar from '../components/Sidebar';
import QueryList from '../components/QueryList';
import QueryDetail from '../components/QueryDetail';

const QueryInbox = () => {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    fetchQueries()
      .then(response => {
        setQueries(response.data);
      })
      .catch(error => {
        console.error('Error fetching queries:', error);
      });
  }, []);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
    setSelectedQuery(null); // Clear the selected query when changing tabs
  };

  const handleQuerySelect = (query) => {
    setSelectedQuery(query);
  };

  const handleMarkAsRead = () => {
    const newStatus = selectedQuery.status.toLowerCase() === 'open' ? 'resolved' : 'open';
    updateQueryStatus(selectedQuery.id, { status: newStatus })
      .then(response => {
        setSelectedQuery(response.data);
        fetchQueries()
          .then(response => {
            setQueries(response.data);
          })
          .catch(error => {
            console.error('Error fetching queries:', error);
          });
      })
      .catch(error => {
        console.error('Error updating query status:', error);
      });
  };

  const filteredQueries = queries.filter(
    query => (tabIndex === 0 && query.status.toLowerCase() === 'open') || 
             (tabIndex === 1 && query.status.toLowerCase() === 'resolved')
  );

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h6">Query Inbox</Typography>
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="query detail tabs">
            <Tab label="Open" />
            <Tab label="Resolved" />
          </Tabs>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <QueryList queries={filteredQueries} onSelect={handleQuerySelect} />
            </Grid>
            <Grid item xs={8}>
              {selectedQuery ? (
                <QueryDetail query={selectedQuery} handleMarkAsRead={handleMarkAsRead} />
              ) : (
                <Typography>Select a query to view details</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QueryInbox;
