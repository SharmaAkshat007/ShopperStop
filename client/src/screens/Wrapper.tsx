import { Redirect } from "react-router-dom";

function Wrapper() {
  if (true) {
    return <Redirect to="/signin" />;
  } else {
    return <Redirect to="/home" />;
  }
}

export default Wrapper;
