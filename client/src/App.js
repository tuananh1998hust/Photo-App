import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
// Components
import AppHeader from "./components/AppHeader";
// Actions
import { loadUser } from "./actions/accountActions";

const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={props => (!token ? <Redirect to="/" /> : <Component {...props} />)}
  />
);

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const { token } = this.props.account;

    return (
      <Router>
        <Fragment>
          <AppHeader />

          <Route exact path="/" component={LoginPage} />
          <Route exact path="/account/signup/" component={RegisterPage} />
          <PrivateRoute
            path="/home/"
            exact
            component={HomePage}
            token={token}
          />
          <PrivateRoute
            path="/profile/:id"
            exact
            component={ProfilePage}
            token={token}
          />
        </Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  account: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  account: state.account
});

export default connect(
  mapStateToProps,
  { loadUser }
)(App);
