import React from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material';

const Header = ({ openCount, selectedTab, handleTabChange }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" component="div">
            Query Inbox
          </Typography>
        </Box>
        <Tabs 
          value={selectedTab} 
          indicatorColor="primary" 
          textColor="primary" 
          onChange={handleTabChange}
        >
          <Tab label={`Open (${openCount})`} value="open" />
          <Tab label="Resolved" value="resolved" />
        </Tabs>
      </AppBar>
    </Box>
  );
};

export default Header;
