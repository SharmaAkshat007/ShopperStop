import { Redirect } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import { useContext } from "react";
function Wrapper() {
  const { user } = useContext(UserContext);
  if (!user.loggedIn) {
    return <Redirect to="/signin" />;
  } else {
    return <Redirect to="/home" />;
  }
}

export default Wrapper;
