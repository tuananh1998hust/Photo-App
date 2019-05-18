import React, { Component } from "react";
import { Form, Input, Spinner } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Actions
import { loadUser } from "../actions/accountActions";
import { getPosts, addCmt } from "../actions/postActions";
// CSS
import "./ListPost.css";
// Images
import unlike from "../imgs/unlike.png";

class ListPost extends Component {
  state = {
    text: ""
  };

  componentDidMount() {
    this.props.getPosts();
  }

  onChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  onSubmit = (postId, e) => {
    e.preventDefault();

    const { text } = this.state;
    const { name } = this.props.account.user;

    const newCmt = {
      name,
      text
    };

    this.props.addCmt(newCmt, postId);

    this.setState({
      text: "",
      postId: ""
    });
  };

  render() {
    const { loading, posts } = this.props.post;
    const { text } = this.state;

    return (
      <div className="p-2">
        {loading === true ? (
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        ) : (
          posts.map(post => (
            <div className="post-item" key={post._id}>
              <Link className="head" to={`/profile/${post.user}`}>
                <img src={post.avatar} alt="avatar" className="avatar" />
                {post.name}
              </Link>

              <div className="img-photo">
                <img src={post.photo} alt="upload" className="photo" />
              </div>

              <div className="likes">
                <img src={unlike} alt="check like" />
              </div>

              <div className="status">
                <Link className="user" to={`/profile/${post.user}`}>
                  {post.name}
                </Link>
                <p className="text-secondary ml-2 mb-0 p-2">{post.status}</p>
              </div>

              <div className="view-post">
                <Link className="view-link" to={`/posts/${post._id}`}>
                  View all comments
                </Link>
              </div>

              <div className="cmts-list">
                {!post.comments
                  ? null
                  : post.comments.slice(post.comments.length - 2).map(cmt => (
                      <div className="cmt-item" key={cmt._id}>
                        <Link className="cmt-user" to={`/profile/${cmt.user}`}>
                          {cmt.name}
                        </Link>
                        <p className="cmt-text">{cmt.text}</p>
                      </div>
                    ))}
              </div>

              <Form
                className="cmt-post"
                onSubmit={this.onSubmit.bind(this, post._id)}
              >
                <Input
                  className="input"
                  name="text"
                  type="textarea"
                  placeholder="Add a comment..."
                  value={text}
                  onChange={this.onChange}
                />
                <button className="btn">Post</button>
              </Form>
            </div>
          ))
        )}
      </div>
    );
  }
}

ListPost.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  addCmt: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  account: state.account
});

export default connect(
  mapStateToProps,
  { getPosts, loadUser, addCmt }
)(ListPost);
