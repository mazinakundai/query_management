import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent } from '@mui/material';
import { fetchQueryDetail } from '../api';

const QueryDetail = () => {
  const { id } = useParams();
  const [query, setQuery] = useState(null);

  useEffect(() => {
    fetchQueryDetail(id).then(response => {
      setQuery(response.data);
    }).catch(error => {
      console.error('Error fetching query detail:', error);
    });
  }, [id]);

  if (!query) return <Typography>Loading...</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{query.employee_id} - {query.employee_name}</Typography>
        <Typography variant="body1">{query.query_reason}</Typography>
      </CardContent>
    </Card>
  );
};

export default QueryDetail;
