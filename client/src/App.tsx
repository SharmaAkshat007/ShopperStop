import { Switch, Route } from "react-router-dom";
import Wrapper from "./screens/Wrapper";
import Signin from "./screens/auth/Signin";
import Signup from "./screens/auth/Signup";
import Home from "./screens/home/Home";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Wrapper />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
