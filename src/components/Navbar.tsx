import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#222831',
  boxShadow: 'none',
  padding: theme.spacing(1, 0),
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#EEEEEE',
  '&:hover': {
    backgroundColor: '#00ADB5',
    color: '#EEEEEE',
  },
}));

const Navbar = () => {
  return (
    <StyledAppBar position="static">
      <Container>
        <StyledToolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#00ADB5' }}>
            SmartSplit
          </Typography>
          <Box>
          <StyledButton component={Link} to="/" variant="text">
              Home
            </StyledButton>
            <StyledButton component={Link} to="/createGroup" variant="text">
              Create
            </StyledButton>
            <StyledButton component={Link} to="/contribute" variant="text">
              Contribute
            </StyledButton>
          </Box>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
