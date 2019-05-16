import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
// Store
import store from "./store";
// Actions
import { loadUser } from "./actions/accountActions";

const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={props => (!token ? <Redirect to="/" /> : <Component {...props} />)}
  />
);

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/account/signup/" component={RegisterPage} />
          <PrivateRoute
            path="/home"
            exact
            component={HomePage}
            token={localStorage.token}
          />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
