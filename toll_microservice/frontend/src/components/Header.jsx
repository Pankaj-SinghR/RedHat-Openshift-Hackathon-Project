import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        paddingBottom: 20,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "center" }}>
            <Typography
              variant="h6"
              component="div"
              onClick={() => navigate("/")}
              style={{
                cursor: "pointer",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              TOLL MICROSERVICE OPENSHIFT
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
