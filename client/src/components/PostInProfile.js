import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { getPosts } from "../actions/postActions";
// CSS
import "./PostInProfile.css";

class PostInProfile extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { id } = this.props;
    const { posts } = this.props.post;

    return (
      <Row>
        {posts
          .filter(post => post.user === id)
          .map(post => (
            <Col className="mb-4" sm="12" md="4" key={post._id}>
              <Link className="link" to={`/posts/${post._id}`}>
                <img className="img" src={post.photo} alt="upload" />
              </Link>
            </Col>
          ))}
      </Row>
    );
  }
}

PostInProfile.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(PostInProfile);
