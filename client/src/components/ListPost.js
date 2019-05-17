import React, { Component } from "react";
import { Input, Spinner } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Actions
import { getPosts } from "../actions/postActions";
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

  onKeyUp = e => {
    const { text } = this.state;

    if (e.keyCode === 13) {
      console.log(text);

      this.setState({
        text: ""
      });
    }
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

              <img className="likes" src={unlike} alt="check like" />

              <div className="status">
                <Link className="user" to={`/profile/${post.user}`}>
                  {post.name}
                </Link>
                <p className="text-secondary ml-2 mb-0 p-2">{post.status}</p>
              </div>

              <Input
                name="text"
                type="textarea"
                placeholder="Add a comment..."
                value={text}
                onChange={this.onChange}
                onKeyUp={this.onKeyUp}
              />
            </div>
          ))
        )}
      </div>
    );
  }
}

ListPost.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(ListPost);
