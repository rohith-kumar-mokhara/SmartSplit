import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, ListItemText, Alert } from '@mui/material';

// Define types for the state
interface Group {
  id: string;
  name: string;
  totalAmount: number;
}

interface Contribution {
  groupId: string;
  amount: number;
  status: string;
}

const UserDashboard = () => {
  const [createdGroups, setCreatedGroups] = useState<Group[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    // Fetch user data from backend or smart contract
    // Example data
    const fetchedGroups: Group[] = [
      { id: '1', name: 'Group A', totalAmount: 500 },
      { id: '2', name: 'Group B', totalAmount: 300 }
    ];
    const fetchedContributions: Contribution[] = [
      { groupId: '1', amount: 100, status: 'Paid' },
      { groupId: '2', amount: 50, status: 'Unpaid' }
    ];
    
    setCreatedGroups(fetchedGroups);
    setContributions(fetchedContributions);
    setStatus('Data loaded successfully!');
  }, []);

  return (
    <Container maxWidth="lg" sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Dashboard
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Created Groups
        </Typography>
        <List>
          {createdGroups.map((group) => (
            <ListItem key={group.id}>
              <ListItemText
                primary={group.name}
                secondary={`Total Amount: $${group.totalAmount}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Contribution History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Group ID</TableCell>
                <TableCell>Amount Contributed</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contributions.map((contribution) => (
                <TableRow key={contribution.groupId}>
                  <TableCell>{contribution.groupId}</TableCell>
                  <TableCell>{contribution.amount}</TableCell>
                  <TableCell>{contribution.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {status && (
        <Box mt={2}>
          <Alert severity={status.includes('success') ? 'success' : 'info'}>
            {status}
          </Alert>
        </Box>
      )}
    </Container>
  );
}

export default UserDashboard;
