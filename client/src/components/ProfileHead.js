import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  Row,
  Spinner
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { getUser, updateAvatar } from "../actions/userActions";
// CSS
import "./ProfileHead.css";

class ProfileHead extends Component {
  state = {
    modal: false,
    file: ""
  };

  componentDidMount() {
    const { id } = this.props;

    this.props.getUser(id);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({
      file: e.target.files[0]
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { id } = this.props;
    const { file } = this.state;

    const formData = new FormData();

    formData.append("photo", file);

    this.props.updateAvatar(id, formData);

    this.setState({
      file: ""
    });

    this.toggle();
  };

  render() {
    const { user, loading } = this.props.user;
    const user_account = this.props.account.user;

    return (
      <div className="header">
        {loading === true ? (
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        ) : user && user_account ? (
          <Row>
            <div className="profile-header">
              <img src={user.avatar} alt="avatar" className="avatar" />

              <div className="info">
                <p className="name">{user.name}</p>
                {user._id === user_account._id ? (
                  <div>
                    <Button
                      size="md"
                      color="success"
                      outline
                      onClick={this.toggle}
                    >
                      Change Avatar
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                      <ModalHeader toggle={this.toggle}>
                        Change Avatar
                      </ModalHeader>
                      <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                          <Input
                            type="file"
                            name="avatar"
                            onChange={this.onChange}
                          />
                          <Button
                            color="success"
                            style={{ marginTop: "2rem" }}
                            block
                            outline
                          >
                            Up Load
                          </Button>
                        </Form>
                      </ModalBody>
                    </Modal>
                  </div>
                ) : null}
              </div>
            </div>
          </Row>
        ) : null}
      </div>
    );
  }
}

ProfileHead.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  updateAvatar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  account: state.account
});

export default connect(
  mapStateToProps,
  { getUser, updateAvatar }
)(ProfileHead);
