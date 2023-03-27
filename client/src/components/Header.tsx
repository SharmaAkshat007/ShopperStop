import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { removeUser } from "../utils/localStorage";
import { useHistory } from "react-router";
import getAccessToken from "../utils/getAccessToken";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Cart } from "../types/cart";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
  cart: Array<Cart>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header(props: HeaderProps) {
  const { sections, title, cart, setOpen } = props;
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
          <RouterLink
            style={{ textDecoration: "none", color: "black" }}
            to="/home"
          >
            {title}
          </RouterLink>
        </Typography>

        <IconButton sx={{ mr: "1.5rem" }}>
          <AccountCircleIcon />
        </IconButton>

        <IconButton
          onClick={() => {
            setOpen(true);
          }}
          sx={{ mr: "1.5rem" }}
        >
          <Badge badgeContent={cart.length} color="primary">
            <ShoppingCartIcon />
          </Badge>
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
            noWrap
            color="inherit"
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </>
  );
}
