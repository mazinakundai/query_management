import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Box, Grid, Typography } from '@mui/material';
import { fetchQueries, fetchQueryDetail, updateQueryStatus } from '../api';
import Sidebar from '../components/Sidebar';
import QueryList from '../components/QueryList';
import QueryDetail from '../components/QueryDetail';

const QueryInbox = () => {
  const { id } = useParams();
  const [queries, setQueries] = useState([]);
  const [query, setQuery] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    fetchQueries()
      .then(response => {
        setQueries(response.data);
      })
      .catch(error => {
        console.error('Error fetching queries:', error);
      });

    if (id) {
      fetchQueryDetail(id)
        .then(response => {
          setQuery(response.data);
        })
        .catch(error => {
          console.error('Error fetching query:', error);
        });
    }
  }, [id]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleMarkAsRead = () => {
    const newStatus = query.status.toLowerCase() === 'open' ? 'resolved' : 'open';
    updateQueryStatus(id, { status: newStatus })
      .then(response => {
        setQuery(response.data);
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
              <QueryList queries={filteredQueries} />
            </Grid>
            <Grid item xs={8}>
              {query ? (
                <QueryDetail query={query} handleMarkAsRead={handleMarkAsRead} />
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
