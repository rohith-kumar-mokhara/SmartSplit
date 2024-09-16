import { Typography, Button, Card, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { keyframes } from "@mui/system";
import { styled } from "@mui/material/styles";
import Navbar from "../../components/Navbar";

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
const AnimatedCard = styled(Card)({
  padding: '24px',
  textAlign: 'center',
  animation: `${slideIn} 1s ease-out`,
  backgroundColor: '#222831',
  color: '#EEEEEE',
});

const AnimatedButton = styled(Button)({
  animation: `${fadeIn} 1s ease-in`,
});

const Home = () => {
  return (
    <>
    <Navbar />
    <Box
      sx={{
        padding: 0,
        margin: 0,
        width: '100%',
        backgroundColor: '#393E46',
        minHeight: '100vh',
        color: '#EEEEEE',
      }}
    >
      <Box textAlign="center" mb={4} sx={{ padding: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom sx={{ color: '#00ADB5', fontWeight: 'bold' }}>
          Welcome to SmartSplit
        </Typography>
        <Typography variant="body1" gutterBottom>
          The easiest way to manage group payments and track contributions.
        </Typography>
        <Box mt={2} display="flex" justifyContent="center" gap={2}>
          <Link to={"/createGroup"} style={{ textDecoration: 'none' }}>
            <AnimatedButton variant="contained" color="primary" sx={{ backgroundColor: '#00ADB5', '&:hover': { backgroundColor: '#007d8c' } }}>
              Create a Group
            </AnimatedButton>
          </Link>
          <Link to={"/contribute"} style={{ textDecoration: 'none' }}>
            <AnimatedButton variant="outlined" color="primary" sx={{ borderColor: '#00ADB5', color: '#00ADB5', '&:hover': { borderColor: '#007d8c', color: '#007d8c' } }}>
              Contribute
            </AnimatedButton>
          </Link>
        </Box>
      </Box>
      <Box mb={4} sx={{ padding: 4 }}>
        <AnimatedCard elevation={6}>
          <Typography variant="h2" component="h2" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="body1" gutterBottom>
            Create a group, invite participants, and start managing your payments effortlessly.
          </Typography>
          <Button variant="contained" color="secondary" sx={{ backgroundColor: '#00ADB5', '&:hover': { backgroundColor: '#007d8c' } }}>
            Learn More
          </Button>
        </AnimatedCard>
      </Box>
    </Box>
    </>
    
  );
};

export default Home;
