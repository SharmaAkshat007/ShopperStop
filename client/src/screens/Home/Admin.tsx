import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import getAccessToken from "../../utils/getAccessToken";
import axios from "axios";
import { getUser, removeUser } from "../../utils/localStorage";
import { useHistory } from "react-router";
import Main from "../../components/Main";
import { Role } from "../../enum";
import { User } from "../../types/user";
import { Redirect } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import Footer from "../../components/Footer";

function DashboardContent() {
  const [panel, setPanel] = useState(0);

  const user: User | null = getUser();

  if (user === null) {
    return <Redirect to="/signin"></Redirect>;
  } else if (user.role === Role.BUYER) {
    return <Redirect to="/home"></Redirect>;
  }
  return (
    <>
      <CssBaseline />
      <AdminHeader title="ShoppersStop" setPanel={setPanel}></AdminHeader>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Main panel={panel} setPanel={setPanel} />
      </Box>
      <Footer title="" description="Made with ❤️ by Akshat Sharma" />
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
