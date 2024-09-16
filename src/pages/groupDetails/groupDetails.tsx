import { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, CircularProgress } from '@mui/material';
import { whoDidntPay, whoPaid } from '../../../smart/interact';

// Define the type for group details state
interface GroupDetailsType {
  paidParticipants: String[];
  unpaidParticipants: String[];
  totalAmount: number;
  contributions: Record<string, number>;
}

const GroupDetails = () => {
  // Initialize state with the correct type
  const [groupDetails, setGroupDetails] = useState<GroupDetailsType>({
    paidParticipants: [],
    unpaidParticipants: [],
    totalAmount: 0,
    contributions: {}
  });
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); // New state for loading
  const [groupId] = useState<number>(1); // Example groupId, can be set dynamically

  useEffect(() => {
    // Fetch group details from the smart contract
    const fetchGroupDetails = async () => {
      setLoading(true); // Start loading
      try {
        const paidAddresses: String[] = await whoPaid(groupId);
        const unpaidAddresses: String[] = await whoDidntPay(groupId);

        // Example data fetching
        const totalAmount = 300; // Replace with actual fetching logic
        const contributions = { Alice: 100, Bob: 150, Charlie: 50 }; // Replace with actual fetching logic
        
        setGroupDetails({
          paidParticipants: paidAddresses,
          unpaidParticipants: unpaidAddresses,
          totalAmount,
          contributions
        });
        setStatus('Data fetched successfully.');
      } catch (error) {
        console.error('Error fetching group details:', error);
        setStatus('Error fetching group details.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  return (
    <Container maxWidth="md" sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1976d2' }}>
        Group Details
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box mb={4}>
              <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#1976d2' }}>
                Participants
              </Typography>
              
              {/* Display Paid Participants */}
              <Box mb={4}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#388e3c' }}>
                  Paid Participants
                </Typography>
                <TableContainer component={Paper} sx={{ borderRadius: 1, overflow: 'hidden' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                        <TableCell>Participant</TableCell>
                        <TableCell>Amount Contributed</TableCell>
                        <TableCell>Payment Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {groupDetails.paidParticipants.map((participant) => (
                        <TableRow  sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f1f8e9' } }}>
                          <TableCell>{participant}</TableCell>
                          <TableCell>{ 0}</TableCell>
                          <TableCell>Paid</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              
              {/* Display Unpaid Participants */}
              <Box mb={4}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#d32f2f' }}>
                  Unpaid Participants
                </Typography>
                <TableContainer component={Paper} sx={{ borderRadius: 1, overflow: 'hidden' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#ffebee' }}>
                        <TableCell>Participant</TableCell>
                        <TableCell>Amount Contributed</TableCell>
                        <TableCell>Payment Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {groupDetails.unpaidParticipants.map((participant) => (
                        <TableRow  sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fce4ec' } }}>
                          <TableCell>{participant}</TableCell>
                          <TableCell>{0}</TableCell>
                          <TableCell>Unpaid</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
            <Box mb={4}>
              <Typography variant="h6" component="h2" gutterBottom>
                Total Amount
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                ${groupDetails.totalAmount}
              </Typography>
            </Box>
            {status && (
              <Box mt={2}>
                <Alert severity={status.includes('Error') ? 'error' : 'success'}>
                  {status}
                </Alert>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default GroupDetails;
