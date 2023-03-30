import { Redirect } from "react-router-dom";
import { getUser } from "../utils/localStorage";
import { User } from "../types/user";

function Wrapper() {
  const user: User | null = getUser();

  if (user === null) {
    return <Redirect to="/signin" />;
  } else {
    return <Redirect to="/home" />;
  }
}

export default Wrapper;
