import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export class AuthRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  shouldComponentUpdate(props) {
    return true
  }

  render() {
    return (
      <>
        {this.props.token ? (
          <>
            <Navigate to="/" replace={true} />
          </>
        ) : (
          <Outlet />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth?.userInfo.token || null,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);
