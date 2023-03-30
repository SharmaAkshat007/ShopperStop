import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { removeUser } from "../utils/localStorage";
import { useHistory } from "react-router";
import getAccessToken from "../utils/getAccessToken";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { primary, secondary, tertiary } from "../utils/color";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";

interface HeaderProps {
  title: string;
  setPanel: Dispatch<SetStateAction<number>>;
}

export default function Header(props: HeaderProps) {
  const { title, setPanel } = props;
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      const access_token: string = await getAccessToken();
      await axios.get(
        `${process.env.REACT_APP_BASE_SERVER_URL_DEV}/api/v1/auth/logout`,
        {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );
      removeUser();
      history.push("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Toolbar
        sx={{
          backgroundColor: primary,
        }}
      >
        <Typography variant="h6" color={secondary}>
          Buy & Sell
        </Typography>

        <Typography
          component="h2"
          variant="h5"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          <RouterLink
            style={{ textDecoration: "none", color: secondary }}
            to="/home"
          >
            {title}
          </RouterLink>
        </Typography>
        <IconButton
          sx={{ mr: "1.5rem", color: secondary }}
          onClick={() => setPanel(0)}
        >
          <DashboardIcon />
        </IconButton>
        <IconButton
          sx={{ mr: "1.5rem", color: secondary }}
          onClick={() => setPanel(1)}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          sx={{ mr: "1.5rem", color: secondary }}
          onClick={() => setPanel(2)}
        >
          <InventoryIcon />
        </IconButton>

        <IconButton onClick={handleSignOut} sx={{ color: secondary }}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </>
  );
}
