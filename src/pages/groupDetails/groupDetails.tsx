import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert } from '@mui/material';

// Define the type for group details state
interface GroupDetailsType {
  participants: string[];
  totalAmount: number;
  contributions: Record<string, number>;
  paymentStatus: Record<string, string>;
}

const GroupDetails = () => {
  // Initialize state with the correct type
  const [groupDetails, setGroupDetails] = useState<GroupDetailsType>({
    participants: [],
    totalAmount: 0,
    contributions: {},
    paymentStatus: {}
  });
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    // Fetch group details from backend or smart contract
    // Example data
    const fetchedData: GroupDetailsType = {
      participants: ['Alice', 'Bob', 'Charlie'],
      totalAmount: 300,
      contributions: { Alice: 100, Bob: 150, Charlie: 50 },
      paymentStatus: { Alice: 'Paid', Bob: 'Paid', Charlie: 'Unpaid' }
    };
    setGroupDetails(fetchedData);
  }, []);

  return (
    <Container maxWidth="md" sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Group Details
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Box mb={4}>
          <Typography variant="h6" component="h2" gutterBottom>
            Participants
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Participant</TableCell>
                  <TableCell>Amount Contributed</TableCell>
                  <TableCell>Payment Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupDetails.participants.map((participant) => (
                  <TableRow key={participant}>
                    <TableCell>{participant}</TableCell>
                    <TableCell>{groupDetails.contributions[participant] || 0}</TableCell>
                    <TableCell>{groupDetails.paymentStatus[participant] || 'Unknown'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box mb={4}>
          <Typography variant="h6" component="h2" gutterBottom>
            Total Amount
          </Typography>
          <Typography variant="body1">
            ${groupDetails.totalAmount}
          </Typography>
        </Box>
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

export default GroupDetails;
