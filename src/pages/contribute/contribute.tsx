import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Alert, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { DoPayment, DoPaymentEvent, whoDidntPay, whoPaid } from '../../../smart/interact.ts';
import { useAmount } from '../../utils/AmountContext.tsx';
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
const AnimatedPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#222831',
  color: '#EEEEEE',
  animation: `${slideIn} 1s ease-out`,
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  animation: `${fadeIn} 1s ease-in`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#00ADB5',
  color: '#EEEEEE',
  '&:hover': {
    backgroundColor: '#007d8c',
  },
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

const Contribute = () => {
  const [groupId, setGroupId] = useState('1');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [groupDetails, setGroupDetails] = useState<GroupDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { amountPaid, total } = useAmount();

  interface GroupDetailsType {
    paidParticipants: String[];
    unpaidParticipants: String[];
    totalAmount: number;
    contributions: Record<string, number>;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!groupId || !amount) {
      setStatus('Please fill out all fields.');
      return;
    }

    const parsedGroupId = parseInt(groupId);
    if (isNaN(parsedGroupId)) {
      setStatus('Group ID must be a valid number.');
      return;
    }

    DoPayment(parsedGroupId)
      .then(() => {
        setStatus('Contribution made successfully!');
        DoPaymentEvent();
        setGroupId('');
        setAmount('');
      })
      .catch(error => {
        setStatus(`Error: ${error.message}`);
      });
  };

  const fetchGroupDetails = async () => {
    setLoading(true);
    setStatus('');
    const parsedGroupId = parseInt(groupId);
    if (isNaN(parsedGroupId)) {
      setStatus('Group ID must be a valid number.');
      setLoading(false);
      return;
    }

    try {
      const paidAddresses = await whoPaid(parsedGroupId);
      const unpaidAddresses = await whoDidntPay(parsedGroupId);

      setGroupDetails({
        paidParticipants: paidAddresses,
        unpaidParticipants: unpaidAddresses,
        totalAmount: total,
        contributions: { Alice: 100, Bob: 150, Charlie: 50 }
      });
      setStatus('Group details fetched successfully.');
    } catch (error) {
      setStatus('Error fetching group details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth={false} sx={{ padding: 4, margin: 0, backgroundColor: '#393E46', minHeight: '100vh', color: '#EEEEEE' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#00ADB5', fontWeight: 'bold', textAlign: 'center' }}>
          Contribute to a Group
        </Typography>
        <AnimatedPaper elevation={3}>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <StyledTextField
                fullWidth
                label="Group ID"
                variant="outlined"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                required
              />
            </Box>
            <Box mb={2}>
              <StyledTextField
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
              <AnimatedButton variant="contained" type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Make Contribution'}
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

        <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: 4, color: '#00ADB5', textAlign: 'center' }}>
          Group Details
        </Typography>
        <AnimatedPaper elevation={3}>
          <Box mb={2}>
            <StyledTextField
              fullWidth
              label="Enter Group ID to Fetch Details"
              variant="outlined"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="center">
            <AnimatedButton variant="contained" onClick={fetchGroupDetails} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Fetch Group Details'}
            </AnimatedButton>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="60vh" mt={3}>
              <CircularProgress />
            </Box>
          ) : groupDetails && (
            <Box mt={3}>
              <Typography variant="h6" sx={{ color: '#00ADB5', textAlign: 'center' }}>Paid Participants</Typography>
              <TableContainer component={Paper} sx={{ backgroundColor: '#222831', color: '#EEEEEE' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#EEEEEE' }}>Participant</TableCell>
                      <TableCell sx={{ color: '#EEEEEE' }}>Amount Contributed</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupDetails.paidParticipants.map((participant, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: '#EEEEEE' }}>{participant}</TableCell>
                        <TableCell sx={{ color: '#EEEEEE' }}>{amountPaid}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="h6" mt={3} sx={{ color: '#00ADB5', textAlign: 'center' }}>Unpaid Participants</Typography>
              <TableContainer component={Paper} sx={{ backgroundColor: '#222831', color: '#EEEEEE' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#EEEEEE' }}>Participant</TableCell>
                      <TableCell sx={{ color: '#EEEEEE' }}>Amount Contributed</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupDetails.unpaidParticipants.map((participant, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: '#EEEEEE' }}>{participant}</TableCell>
                        <TableCell sx={{ color: '#EEEEEE' }}>0</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </AnimatedPaper>
      </Container>
    </>
  );
};

export default Contribute;
