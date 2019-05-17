import React, { Component } from "react";
import {
  Alert,
  Button,
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Row
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { loginUser } from "../actions/accountActions";
// CSS
import "./AccountPage.css";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    token: null
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const formLogin = {
      email,
      password
    };

    this.props.loginUser(formLogin);
  };

  render() {
    const { msg } = this.props.account;
    const token = localStorage.getItem("token");

    if (token) {
      return <Redirect to="/home" />;
    }

    return (
      <Container>
        <Row>
          <Col className="layout" sm="12" md={{ size: 3, offset: 3 }} />
          <Col sm="12" md="4">
            <div className="form-first">
              <h2 className="head">Photo App</h2>
              {msg
                ? msg.map((item, index) => (
                    <Alert color="danger" key={index}>
                      {item}
                    </Alert>
                  ))
                : null}
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Input
                    className="mb-2"
                    onChange={this.onChange}
                    name="email"
                    placeholder="Email"
                    type="text"
                  />
                  <Input
                    className="mb-2"
                    onChange={this.onChange}
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                </FormGroup>
                <Button color="primary" block>
                  Log in
                </Button>
              </Form>
            </div>
            <div className="account d-flex justify-content-center">
              <p className="text-secondary">Don't have an account?</p>
              <Link className="ml-2" to="/account/signup">
                Sign up
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

LoginPage.propTypes = {
  account: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  account: state.account
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginPage);
