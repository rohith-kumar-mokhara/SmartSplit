import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Alert, CircularProgress } from '@mui/material';
import { createGroup } from '../../../smart/interact.ts';

const CreatingGroup = () => {
  const [participants, setParticipants] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [status, setStatus] = useState('');
  const [payer, setPayer] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate inputs
    const participantsArray = participants.split(',').map(p => p.trim()).filter(p => p !== '');
    if (participantsArray.length === 0 || totalAmount <= 0 || !payer) {
      setStatus('Please fill out all fields correctly.');
      return;
    }

    setLoading(true); // Start loading
    createGroup(participantsArray, totalAmount, payer)
      .then(() => {
        setStatus('Group created successfully!');
        setParticipants('');
        setTotalAmount(0);
        setPayer('');
      })
      .catch(error => {
        setStatus(`Error: ${error.message}`);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1976d2' }}>
        Create a New Group
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Participants (comma-separated addresses)"
              variant="outlined"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              required
              sx={{ backgroundColor: '#f9f9f9' }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Total Amount"
              variant="outlined"
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(Number(e.target.value))}
              required
              sx={{ backgroundColor: '#f9f9f9' }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Payer"
              variant="outlined"
              value={payer}
              onChange={(e) => setPayer(e.target.value)}
              required
              sx={{ backgroundColor: '#f9f9f9' }}
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading} // Disable button while loading
              sx={{ borderRadius: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Group'}
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
};

export default CreatingGroup;
