import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { addPost } from "../actions/postActions";

class PostModal extends Component {
  state = {
    file: "",
    status: ""
  };

  onChangeFile = e => {
    this.setState({
      file: e.target.files[0]
    });
  };

  onChangeStatus = e => {
    this.setState({
      status: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { file, status } = this.state;
    const { name, avatar } = this.props.account.user;

    const formData = new FormData();

    formData.append("photo", file);
    formData.append("status", status);
    formData.append("name", name);
    formData.append("avatar", avatar);

    this.props.addPost(formData);

    this.setState({
      file: "",
      status: ""
    });
  };

  render() {
    const { status } = this.state;

    return (
      <div className="mb-3">
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input type="file" onChange={this.onChangeFile} name="photo" />
            <Input
              type="textarea"
              name="status"
              placeholder="Write a caption..."
              value={status}
              onChange={this.onChangeStatus}
            />
          </FormGroup>
          <Button color="success" block>
            Share
          </Button>
        </Form>
      </div>
    );
  }
}

PostModal.propTypes = {
  account: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  account: state.account,
  post: state.post
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostModal);
