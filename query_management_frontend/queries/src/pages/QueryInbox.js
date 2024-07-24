import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import Sidebar from '../components/Sidebar';
import QueryList from '../components/QueryList';
import QueryDetail from '../components/QueryDetail';
import Header from '../components/Header';
import { Routes, Route } from 'react-router-dom';
import { fetchQueries } from '../api';

const QueryInbox = () => {
  const [openCount, setOpenCount] = useState(0);
  const [selectedTab, setSelectedTab] = useState('open');
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    fetchQueries()
      .then(response => {
        console.log(response.data); // Log the fetched data
        const openQueries = response.data.filter(query => query.status === 'open');
        const resolvedQueries = response.data.filter(query => query.status === 'resolved');
        setOpenCount(openQueries.length);
        setQueries(selectedTab === 'open' ? openQueries : resolvedQueries);
      })
      .catch(error => {
        console.error('Error fetching queries:', error);
      });
  }, [selectedTab]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9}>          
          <Header openCount={openCount} selectedTab={selectedTab} handleTabChange={handleTabChange} />
          <Routes>
            <Route path="/queries/:id" element={<QueryDetail />} />
            <Route path="/" element={<QueryList queries={queries} />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
};

export default QueryInbox;
