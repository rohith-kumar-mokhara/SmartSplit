import React from "react";
import { Container, Typography, Button, Card, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ padding: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h1" component="h1" gutterBottom>
          Welcome to SmartSplit
        </Typography>
        <Typography variant="body1" gutterBottom>
          The easiest way to manage group payments and track contributions.
        </Typography>
        <Box mt={2} display="flex" justifyContent="center" gap={2}>
          <Link to={"/createGroup"}>
            <Button variant="contained" color="primary">
              Create a Group
            </Button>
          </Link>
          <Link to={"/contribute"}>
          <Button variant="outlined" color="primary">
            Contribute
          </Button>
          </Link>
        </Box>
      </Box>
      <Box mb={4}>
        <Card sx={{ padding: 4, textAlign: "center" }}>
          <Typography variant="h2" component="h2" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="body1" gutterBottom>
            Create a group, invite participants, and start managing your
            payments effortlessly.
          </Typography>
          <Button variant="contained" color="secondary">
            Learn More
          </Button>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
