// QueryCard.js
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
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
    <Card variant="outlined" component={Link} to={`/queries/${query.id}`} style={{ textDecoration: 'none', marginBottom: '1rem' }}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            {getIcon(query.query_type)}
          </Grid>
          <Grid item>
            <Typography variant="h6">
              {query.query_type} - {query.employee_name}
            </Typography>
            <Typography color="textSecondary">
              {query.location}
            </Typography>
            <Typography color="textSecondary">
              {query.date}
            </Typography>
            <Typography color="textSecondary">
              {query.status}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QueryCard;
