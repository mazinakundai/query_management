import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
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

const QueryCard = ({ query }) => {
  return (
    <Box>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} sm="auto">
          {getIcon(query.query_type)}
        </Grid>
        <Grid item xs={12} sm>
          {query.query_type}
        </Grid>
        <Grid item xs={12} sm="auto">
          <Typography color="textSecondary">
            {query.status}
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h6">
            {query.employee_id_number} - {query.employee_name}
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} sm>
          <Typography color="textSecondary">
            {query.site}
          </Typography>
        </Grid>
        <Grid item xs={12} sm="auto">
          <Typography color="textSecondary">
            {query.date_of_query}
          </Typography>
        </Grid>         
      </Grid>
    </Box>
  );
};

export default QueryCard;
