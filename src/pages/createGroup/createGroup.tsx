import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Alert } from '@mui/material';

const CreateGroup = () => {
  const [participants, setParticipants] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event:any) => {
    event.preventDefault();

    // Example validation
    if (!participants || !totalAmount) {
      setStatus('Please fill out all fields.');
      return;
    }

    // Example submission logic
    console.log('Creating Group:', { participants, totalAmount });
    // Here, you would handle smart contract deployment and state management

    setStatus('Group created successfully!');
    // Reset form fields after submission
    setParticipants('');
    setTotalAmount('');
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create a New Group
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Participants (comma-separated addresses)"
              variant="outlined"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Total Amount"
              variant="outlined"
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              required
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" type="submit">
              Create Group
            </Button>
          </Box>
        </form>
        {status && (
          <Box mt={2}>
            <Alert severity={status.includes('success') ? 'success' : 'error'}>
              {status}
            </Alert>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default CreateGroup;
