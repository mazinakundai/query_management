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

const QueryDetail = ({ query, handleMarkAsRead }) => {
  const [tabIndex, setTabIndex] = React.useState(0);

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
        {/* Query Report Information */}
        <Card variant="outlined" style={{ textDecoration: 'none', marginBottom: '1rem' }}>
          <CardContent>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                {getIcon(query.query_type)}
              </Grid>
              <Grid item>
                {query.query_type}
              </Grid>
              <Grid item>
                <Typography color="textSecondary">
                  {query.status}
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color={query.status === 'open' ? 'primary' : 'secondary'} onClick={handleMarkAsRead}>
                  {query.status === 'open' ? 'Mark as Resolved' : 'Mark as Open'}
                </Button>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Typography variant="h6">
                  {query.employee_name} ({query.employee_id_number}) submitted a query
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>Branch
                <Typography color="textSecondary">
                  {query.branch}
                </Typography>
              </Grid>
              <Grid item>
                Site
                <Typography color="textSecondary">
                  {query.site}
                </Typography>
              </Grid>         
            </Grid>
          </CardContent>
        </Card>
        {/* Query Details Information */}
        <Card variant="outlined" style={{ textDecoration: 'none', marginBottom: '1rem' }}>
          <CardContent>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Typography variant="h6">
                 Query details
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                Query reason
                <Typography color="textSecondary">
                  {query.query_reason}
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                Other information
                <Typography color="textSecondary">
                  {query.other_information}
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                Date of query
                <Typography color="textSecondary">
                  {query.date_of_query}
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                Payslip issue date
                <Typography color="textSecondary">
                  {query.payslip_issue_date}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {/* Employee details */}
        <Card variant="outlined" style={{ textDecoration: 'none', marginBottom: '1rem' }}>
          <CardContent>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Typography variant="h6">
                 Employee details
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>ID number
                <Typography color="textSecondary">
                  {query.employee_id_number}
                </Typography>
              </Grid>
              <Grid item>
                Contact number
                <Typography color="textSecondary">
                  {query.contact_number}
                </Typography>
              </Grid>         
            </Grid>
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
