import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#222831",
  boxShadow: "none",
  padding: theme.spacing(1, 0),
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(0, 2),
}));

const StyledButton = styled(Button)(({}) => ({
  color: "#EEEEEE",
  "&:hover": {
    backgroundColor: "#00ADB5",
    color: "#EEEEEE",
  },
}));

const Navbar = () => {
  return (
    <StyledAppBar position="static">
      <Container>
        <StyledToolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#00ADB5" }}
          >
            SmartSplit
          </Typography>
          <Box>
            <Link to={"/"}>
              <StyledButton variant="text">Home</StyledButton>
            </Link>
            <Link to={"/createGroup"}>
              <StyledButton variant="text">Create</StyledButton>
            </Link>
            <Link to={"/contribute"}>
              <StyledButton variant="text">Contribute</StyledButton>
            </Link>
          </Box>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
