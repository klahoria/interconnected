import React, { Component } from "react";
import "./Header.css";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import { connect } from "react-redux";

// FiSearch

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <>
        <div className="col-lg-9 col-12 px-0">
          <div className="w-100 bg-white">
            <nav className="navbar navbar-expand-lg navbar-light bg-white header_s1">
              <div className="container-fluid">
                <a className="navbar-brand" href="/">
                  <img
                    width="60px"
                    height={"60px"}
                    className="rounded-5 border"
                    src={
                      this.props?.state?.auth?.userInfo?.userProfileInfo
                        .profile_image || ""
                    }
                    alt=""
                  />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse mt-2"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item ms-3">
                      <h4>Good Morning Kumar!</h4>
                    </li>
                  </ul>
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="col-3 d-none d-lg-block">
          <nav className="navbar navbar-expand-lg navbar-light header_s1">
            <div className="container-fluid px-0">
              <a className="navbar-brand" href="/">
                <main className="w-100 py-3">
                  <h5>Orizon Crypto</h5>
                  <h6 className="text-muted">increase your profit</h6>
                </main>
              </a>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-end">
                  <li className="nav-item mx-2">
                    <Button className="nav-link rounded-5 bg-white border">
                      <FiSearch />
                    </Button>
                  </li>
                  <li className="nav-item mx-2">
                    <Button className="nav-link rounded-5 bg-white border">
                      <FiSearch />
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

export const Button = styled.button`
  width: 40px !important;
  height: 40px !important;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
