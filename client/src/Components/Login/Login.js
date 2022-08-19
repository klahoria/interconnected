import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { login_action } from "../../store/Actions/Auth/Auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: { email: "", password: "" },
    };
  }

  componentDidMount() {
    if (this.props.userInfo_state.email && this.props.userInfo_state.password) {
      this.setState(
        (prev) => (prev["userInfo"] = {...this.props.userInfo_state}),
      );
    }
  }

  handleLogin(data) {
    this.props.login(data);
  }

  render() {
    return (
      <div className="row justify-content-center align-items-center ">
        <div className="col-md-4 col-12 pb-5 border rounded-4 shadow">
          <h2 className="py-3 text-center px-3">Login</h2>

          <Formik
            initialValues={this.state.userInfo}
            enableReinitialize={true}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Please enter a valid email address")
                .required("Please enter a valid email address."),
              password: Yup.string()
                .required("Please enter a password.")
                .min(6, "Password must be atleast 6 characters."),
            })}
            onSubmit={async (value) => {
              // alert(value);
              this.props.login(value);
            }}
          >
            {({ value, isSubmitting, errors, touched, dirty }) => (
              <Form className="  p-4">
                <div className="col-auto mb-3">
                  <label htmlFor="staticEmail2" className="visually-hidden">
                    Email
                  </label>
                  <Field
                    type="text"
                    name="email"
                    className="form-control form-control-lg"
                    id="staticEmail2"
                    placeholder="Email"
                  />
                  <span className="text-danger">
                    <ErrorMessage name="email" />
                  </span>
                </div>
                <div className="col-auto">
                  <label htmlFor="staticEmail2" className="visually-hidden">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="text"
                    className="form-control-lg form-control"
                    id="staticEmail2"
                    placeholder="Password"
                  />
                  <span className="text-danger">
                    <ErrorMessage name="password" />
                  </span>
                </div>

                <div className="col-auto w-100 my-3">
                  <div className="row justify-content-center">
                    <button className="btn btn-primary px-4 py-2 col-6">
                      Login
                    </button>
                  </div>
                </div>

                <div className="col-auto text-center">
                  <span>{/* <Link to="/register">Register</Link> */}</span>

                  {/* <div className="row justify-content-center"> */}
                  {/* </div> */}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    token: "",
    userInfo_state: {
      email: state.auth.userInfo.email || "",
      password: state.auth.userInfo?.password || "",
    },
  }
);

const mapDispatchToProps = {
  login: (data) => login_action(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
