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
    <Box width="100%">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center" flex={1}>
          <Typography color="textSecondary">
            {getIcon(query.query_type)}
          </Typography>
          <Typography color="textSecondary" style={{ marginLeft: '8px' }}>
            {query.query_type}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-end" flex={1}>
          <Typography color="textSecondary">
            {query.status}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6">
          {query.employee_id_number} - {query.employee_name}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box flex={1}>
          <Typography color="textSecondary" gutterBottom>
            {query.site}
          </Typography>
        </Box>
        <Box flex={1}>
          <Typography color="textSecondary" gutterBottom>
            {query.date_of_query}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default QueryCard;
