import { Redirect } from "react-router-dom";
import { getUser } from "../utils/localStorage";
import { User } from "../types/user";
import { Role } from "../enum";

function Wrapper() {
  const user: User | null = getUser();

  if (user === null) {
    return <Redirect to="/signin" />;
  } else if (user.role === Role.BUYER) {
    return <Redirect to="/home" />;
  } else if (user.role === Role.SELLER) {
    return <Redirect to="/admin" />;
  } else {
    return <></>;
  }
}

export default Wrapper;
