import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import PrivateRoute from "./Helpers/Routes/PrivateRoutes/PrivateRoute";
import AuthRoute from "./Helpers/Routes/AuthRoutes/AuthRoute";
import NotFound from "./Components/404/NotFound";
import Landing from "./Components/Landing/Landing";
import "./App.css";
import ProtectedRoute from "./Helpers/Routes/ProtectedRoute/ProtectedRoute";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className="container-fluid in_max"
        style={{
          minheight: window.innerHeight,
          height: "100vh",
          overflowX: "auto",
        }}
      >
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<AuthRoute />}>
            <Route element={<Login />} path="/login" />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Landing />} exact />
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    );
  }
}

export default App;
