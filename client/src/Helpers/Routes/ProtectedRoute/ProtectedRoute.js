import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export class ProtectedRoute extends Component {
  render() {
    return (
      <>
        {this.props.token ? (
          <Outlet />
        ) : (
          <Navigate to="/login" replace={true} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => (
  {
    token: state.auth?.userInfo.token || null,
  }
);

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
