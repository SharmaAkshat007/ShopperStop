import { Redirect } from "react-router";
import { Role } from "../../enum";
import { getUser } from "../../utils/localStorage";

export default function Admin() {
  const user = getUser();

  if (user === null || user.role === Role.BUYER) {
    return <Redirect to="/signin"></Redirect>;
  } else {
    return <div>Admin</div>;
  }
}
