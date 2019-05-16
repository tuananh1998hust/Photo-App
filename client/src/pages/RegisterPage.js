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
import { register } from "../actions/accountActions";
// CSS
import "./AccountPage.css";

class RegisterPage extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;

    const formRegister = {
      name,
      email,
      password,
      password2
    };

    this.props.register(formRegister);
  };

  render() {
    const { isAuthenticated, msg } = this.props.account;

    if (isAuthenticated === true) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <Row>
          <Col className="form-first" sm="12" md={{ size: 4, offset: 4 }}>
            <h2 className="head">Photo App</h2>
            <p className="intro">Sign up to see photos</p>
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
                  name="name"
                  placeholder="Name"
                  type="text"
                />
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
                <Input
                  className="mb-2"
                  onChange={this.onChange}
                  name="password2"
                  placeholder="Password2"
                  type="password"
                />
              </FormGroup>
              <Button color="primary" block>
                Sign up
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="account" sm="12" md={{ size: 4, offset: 4 }}>
            <div className="text-center">
              Have an account?
              <Link className="ml-2" to="/">
                Log in
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

RegisterPage.propTypes = {
  account: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  account: state.account
});

export default connect(
  mapStateToProps,
  { register }
)(RegisterPage);
