import React, { Component, Fragment } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { logout } from "../actions/accountActions";
// Images
import navlogo from "../imgs/nav-logo.png";
import user from "../imgs/user.png";
import logouticon from "../imgs/logout.png";
// CSS
import "./AppHeader.css";

class AppHeader extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onClick = () => {
    this.props.logout();
  };

  render() {
    const { token } = this.props.account;

    const authLink = (
      <Fragment>
        <NavItem className="nav-item">
          <Link to="/profile/">
            <img src={user} alt="user" />
          </Link>
        </NavItem>
        <NavItem className="nav-item" onClick={this.onClick}>
          <img src={logouticon} alt="logout" />
        </NavItem>
      </Fragment>
    );

    return (
      <div id="navbar" className="mb-5">
        <Navbar color="light" light expand="sm">
          <Container>
            <Link className="nav-logo" to="/home">
              <img src={navlogo} alt="logo" />
              <p>App Photo</p>
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {token ? authLink : null}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

AppHeader.propTypes = {
  account: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  account: state.account
});

export default connect(
  mapStateToProps,
  { logout }
)(AppHeader);
