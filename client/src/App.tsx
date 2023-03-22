import { Switch, Route } from "react-router-dom";
import Wrapper from "./screens/Wrapper";
import Signin from "./screens/auth/Signin";
import Signup from "./screens/auth/Signup";
import Home from "./screens/Home/Home";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "./utils/theme";
function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
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
      </ThemeProvider>
    </>
  );
}

export default App;
