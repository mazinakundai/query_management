import React from 'react';
import { Tabs, Tab, Box, Button, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';

// Helper function to get the appropriate icon based on the query type
const getIcon = (queryType) => {
  switch (queryType) {
    case 'Timesheet Query':
      return <AccessTimeIcon />;
    case 'Payslip Query':
      return <DescriptionIcon />;
    case 'Roster Query':
      return <PeopleIcon />;
    default:
      return <DescriptionIcon />;
  }
};

// TabPanel component to render the content of each tab
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
          {children}
        </Box>
      )}
    </div>
  );
};

// QueryDetail component to display detailed information about a selected query
const QueryDetail = ({ query, handleMarkAsRead }) => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  if (!query) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="query detail tabs" variant="scrollable" scrollButtons="auto">
        <Tab label="Details" />
        <Tab label="Payslips" />
        <Tab label="Supporting Documents" />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <Box sx={{ marginBottom: '1rem', paddingBottom: '10px', borderBottom: '2px solid #ccc' }}>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center" flex={1}>
              <Typography color="textSecondary">
                {getIcon(query.query_type)}
              </Typography>
              <Typography color="textSecondary" style={{ marginLeft: '8px' }}>
                {query.query_type}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" flex={1}>
              <Typography color="textSecondary">
                {query.status}
              </Typography>
              <Typography color="textSecondary" style={{ marginLeft: '8px' }}>
                <Button
                  variant="contained"
                  color={query.status === 'Open' ? 'primary' : 'secondary'}
                  onClick={handleMarkAsRead}
                >
                  {query.status === 'Open' ? 'Mark as Resolved' : 'Mark as Open'}
                </Button>
              </Typography>
            </Box>
          </Box>
          <Box item xs={12}>
            <Typography variant="h6">
              {query.employee_name} ({query.employee_id_number}) submitted a query
            </Typography>
          </Box>
          <Box display="flex">
            <Box flex={1}>
              <Typography style={{ fontSize: '0.75rem', color: 'lightgrey' }} gutterBottom>
                Branch:
              </Typography>
              <Typography color="textSecondary">
                {query.branch}
              </Typography>
            </Box>
            <Box flex={1}>
              <Typography style={{ fontSize: '0.75rem', color: 'lightgrey' }} gutterBottom>
                Site:
              </Typography>
              <Typography color="textSecondary">
                {query.site}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ paddingBottom: '10px', marginBottom: '1rem', borderBottom: '2px solid #ccc' }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Query Details
            </Typography>
            <Typography style={{ fontSize: '0.75rem', color: 'lightgrey' }} gutterBottom>
              Query reason:
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {query.query_reason}
            </Typography>
            <Typography style={{ fontSize: '0.75rem', color: 'lightgrey' }} gutterBottom>
              Other information:
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {query.other_information}
            </Typography>
            <Typography style={{ fontSize: '0.75rem', color: 'lightgrey' }} gutterBottom>
              Date of query:
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {query.date_of_query}
            </Typography>
            <Typography style={{ fontSize: '0.75rem', color: 'lightgrey' }} gutterBottom>
              Payslip issue date:
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {query.payslip_issue_date}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ paddingBottom: '10px', borderBottom: '2px solid #ccc' }}>
          <Typography variant="h6" gutterBottom>
            Employee Details
          </Typography>
          <Box display="flex">
            <Box flex={1}>
              <Typography style={{ fontSize: '0.75rem', color: 'lightgrey' }} gutterBottom>
                ID number:
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {query.employee_id_number}
              </Typography>
            </Box>
            <Box flex={1}>
              <Typography style={{ fontSize: '0.75rem', color: 'lightgrey' }} gutterBottom>
                Contact number:
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {query.contact_number}
              </Typography>
            </Box>
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Typography>Payslips content goes here</Typography>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <Typography>Supporting Documents content goes here</Typography>
      </TabPanel>
    </Box>
  );
};

export default QueryDetail;
