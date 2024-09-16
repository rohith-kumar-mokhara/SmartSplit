import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Alert, CircularProgress } from '@mui/material';
import { createGroup } from '../../../smart/interact.ts';
import { useAmount } from '../../utils/AmountContext.tsx';
import { keyframes } from '@mui/system';
import { styled } from '@mui/material/styles';
import Navbar from '../../components/Navbar.tsx';

// Define keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Styled components
const AnimatedPaper = styled(Paper)(({  }) => ({
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#222831',
  color: '#EEEEEE',
  animation: `${slideIn} 1s ease-out`,
  width: '100%', // Ensure Paper occupies full width
  maxWidth: '800px', // Optional: Control maximum width
  margin: '0 auto', // Center the Paper horizontally
}));

const AnimatedButton = styled(Button)(({ }) => ({
  animation: `${fadeIn} 1s ease-in`,
}));

const StyledTextField = styled(TextField)(({ }) => ({
  backgroundColor: '#393E46',
  color: '#EEEEEE',
  '& .MuiInputLabel-root': {
    color: '#EEEEEE',
  },
  '& .MuiInputBase-root': {
    color: '#EEEEEE',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#00ADB5',
    },
    '&:hover fieldset': {
      borderColor: '#007d8c',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00ADB5',
    },
  },
}));

const CreatingGroup = () => {
  const [participants, setParticipants] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [status, setStatus] = useState('');
  const [payer, setPayer] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAmountPaid, setTotal } = useAmount();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate inputs
    const participantsArray = participants.split(',').map(p => p.trim()).filter(p => p !== '');
    if (participantsArray.length === 0 || totalAmount <= 0 || !payer) {
      setStatus('Please fill out all fields correctly.');
      return;
    }
    const calculatedAmountPaid = totalAmount / participantsArray.length;
    console.log("amount to be paid is ", calculatedAmountPaid);
    setTotal(totalAmount);
    setAmountPaid(calculatedAmountPaid);
    setLoading(true);
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
        setLoading(false);
      });
  };

  return (
    <>
    <Navbar />
    <Container maxWidth = {false} sx={{ padding: 0, margin: 0, width: '100%', backgroundColor: '#393E46', minHeight: '100vh', color: '#EEEEEE' }}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', padding: 4 }}>
        <Box sx={{ width: '100%', maxWidth: '800px' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#00ADB5', fontWeight: 'bold', textAlign: 'center' }}>
            Create a New Group
          </Typography>
          <AnimatedPaper elevation={3}>
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <StyledTextField
                  fullWidth
                  label="Participants (comma-separated addresses)"
                  variant="outlined"
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  required
                />
              </Box>
              <Box mb={2}>
                <StyledTextField
                  fullWidth
                  label="Total Amount"
                  variant="outlined"
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(Number(e.target.value))}
                  required
                />
              </Box>
              <Box mb={2}>
                <StyledTextField
                  fullWidth
                  label="Payer"
                  variant="outlined"
                  value={payer}
                  onChange={(e) => setPayer(e.target.value)}
                  required
                />
              </Box>
              <Box mt={2} display="flex" justifyContent="center">
                <AnimatedButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  sx={{ backgroundColor: '#00ADB5', '&:hover': { backgroundColor: '#007d8c' }, borderRadius: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Create Group'}
                </AnimatedButton>
              </Box>
            </form>
            {status && (
              <Box mt={2}>
                <Alert severity={status.includes('success') ? 'success' : 'error'}>
                  {status}
                </Alert>
              </Box>
            )}
          </AnimatedPaper>
        </Box>
      </Box>
    </Container>
    </>
   
  );
};

export default CreatingGroup;
