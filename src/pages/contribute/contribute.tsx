import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Alert } from '@mui/material';

const Contribute = () => {
  const [groupId, setGroupId] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event:any) => {
    event.preventDefault();

    // Example validation
    if (!groupId || !amount) {
      setStatus('Please fill out all fields.');
      return;
    }

    // Example submission logic
    console.log('Making Contribution:', { groupId, amount });
    // Here, you would handle smart contract interaction or payment processing

    setStatus('Contribution made successfully!');
    // Reset form fields after submission
    setGroupId('');
    setAmount('');
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contribute to a Group
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Group ID"
              variant="outlined"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Amount"
              variant="outlined"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" type="submit">
              Make Contribution
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

export default Contribute;
