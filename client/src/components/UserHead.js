import React, { Component } from "react";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class UserHead extends Component {
  render() {
    const { user } = this.props.account;

    return (
      <div className="mb-3 p-3" style={{ borderBottom: "1px solid #ddd" }}>
        {user ? (
          <Link
            className="d-flex align-items-center mr-2"
            to={`/profile/${user._id}`}
          >
            <img
              src={user.avatar}
              alt="avatar"
              className="avatar rounded-circle"
              width="64x"
              height="64px"
            />
            <p className="text-secondary ml-2">{user.name}</p>
          </Link>
        ) : (
          <Spinner size="sm" color="secondary" />
        )}
      </div>
    );
  }
}

UserHead.propTypes = {
  account: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  account: state.account
});

export default connect(mapStateToProps)(UserHead);
