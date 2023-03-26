import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { removeUser } from "../utils/localStorage";
import { useHistory } from "react-router";
import getAccessToken from "../utils/getAccessToken";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

export default function Header(props: HeaderProps) {
  const { sections, title } = props;
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
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography>Buy & Sell</Typography>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton sx={{ mr: "1.5rem" }}>
          <AccountCircleIcon />
        </IconButton>
        <IconButton sx={{ mr: "1.5rem" }}>
          <ShoppingCartIcon />
        </IconButton>
        <Button variant="outlined" size="small" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
