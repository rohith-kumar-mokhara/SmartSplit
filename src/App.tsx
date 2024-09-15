import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import CreateGroup from "./pages/creatingGroup/creatingGroup";
import Contribute from "./pages/contribute/contribute";
import GroupDetails from "./pages/groupDetails/groupDetails";
import UserDashboard from "./pages/dashboard/dashboard";
import { AmountProvider } from "./utils/AmountContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Define your custom theme
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif', // Use Poppins font
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Poppins", sans-serif',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Poppins", sans-serif',
        },
      },
    },
    // Add other components if needed
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AmountProvider>
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createGroup" element={<CreateGroup />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/groupDetails" element={<GroupDetails />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Routes>
        </BrowserRouter>
      </>
    </AmountProvider>
    </ThemeProvider>
    
  );
}

export default App;
