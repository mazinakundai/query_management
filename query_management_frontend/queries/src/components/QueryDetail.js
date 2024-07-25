import React from 'react';
import { Tabs, Tab, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';

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
        <Card sx={{ marginBottom: '1rem' }}>
          <CardContent>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} sm="auto">
                {getIcon(query.query_type)}
              </Grid>
              <Grid item xs={12} sm>
                {query.query_type}
              </Grid>
              <Grid item xs={12} sm>
                <Typography color="textSecondary">
                  {query.status}
                </Typography>
              </Grid>
              <Grid item xs={12} sm="auto">
                <Button
                  variant="contained"
                  color={query.status === 'open' ? 'primary' : 'secondary'}
                  onClick={handleMarkAsRead}
                >
                  {query.status === 'open' ? 'Mark as Resolved' : 'Mark as Open'}
                </Button>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2} sx={{ marginTop: 1 }}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  {query.employee_name} ({query.employee_id_number}) submitted a query
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2} sx={{ marginTop: 1 }}>
              <Grid item xs={12} sm>
                Branch
                <Typography color="textSecondary">
                  {query.branch}
                </Typography>
              </Grid>
              <Grid item xs={12} sm>
                Site
                <Typography color="textSecondary">
                  {query.site}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ marginBottom: '1rem' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Query Details
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Query reason: {query.query_reason}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Other information: {query.other_information}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Date of query: {query.date_of_query}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Payslip issue date: {query.payslip_issue_date}
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ marginBottom: '1rem' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Employee Details
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              ID number: {query.employee_id_number}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Contact number: {query.contact_number}
            </Typography>
          </CardContent>
        </Card>
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

export default QueryDetail;
