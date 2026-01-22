import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: 'center', paddingTop: '10%' }}>
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5">
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        component={Link} 
        to="/"
      >
        Go to Home
      </Button>
    </Container>
  );
}

export default PageNotFound;
