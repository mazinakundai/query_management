import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Grid, Typography, useMediaQuery, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { fetchQueries, updateQueryStatus } from '../api';
import Sidebar from '../components/Sidebar';
import QueryList from '../components/QueryList';
import QueryDetail from '../components/QueryDetail';

const QueryInbox = () => {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(min-width:600px) and (max-width:900px)');

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
    if (isMobile || isTablet) {
      setDrawerOpen(false); // Close the drawer when a query is selected on smaller screens
    }
  };

  const handleMarkAsRead = () => {
    if (!selectedQuery) return; // Ensure a query is selected
    const newStatus = selectedQuery.status === 'Open' ? 'Resolved' : 'Open';
    const updatedQuery = { ...selectedQuery, status: newStatus };

    updateQueryStatus(updatedQuery)
      .then(response => {
        setSelectedQuery(response.data);

        // Optionally, you can also update the query list in the parent component
        fetchQueries()
          .then(response => {
            setQueries(response.data);
          })
          .catch(error => {
            console.error('Error fetching queries:', error);
          });
      })
      .catch(error => {
        console.error('Error updating query status:', error.response);
      });
  };

  const filteredQueries = queries.filter(
    query => (tabIndex === 0 && query.status === 'Open') ||
             (tabIndex === 1 && query.status === 'Resolved')
  );

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Box width="100%" maxWidth="1200px" padding="16px">
        <Grid container spacing={3}>
          {!isTablet && !isMobile && (
            <Grid item xs={3}>
              <Sidebar />
            </Grid>
          )}
          {(isMobile || isTablet) && (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => setDrawerOpen(true)}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Sidebar />
              </Drawer>
            </>
          )}
          <Grid item xs={isTablet || isMobile ? 12 : 9}>
            <Box sx={{ marginBottom: '16px', borderBottom: '2px solid #ccc' }}>
              <Typography variant="h4">Query Inbox</Typography>
              <Tabs value={tabIndex} onChange={handleTabChange} aria-label="query detail tabs">
                <Tab label="Open" />
                <Tab label="Resolved" />
              </Tabs>
            </Box>
            <Grid container spacing={3}>
              {isTablet || isMobile ? (
                <>
                  <Grid item xs={12}>
                    <QueryList queries={filteredQueries} onSelect={handleQuerySelect} />
                  </Grid>
                  <Grid item xs={12}>
                    {selectedQuery ? (
                      <QueryDetail query={selectedQuery} handleMarkAsRead={handleMarkAsRead} />
                    ) : (
                      <Typography>Select a query to view details</Typography>
                    )}
                  </Grid>
                </>
              ) : (
                <>
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
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default QueryInbox;
