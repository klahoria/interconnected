import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        current_address: {
          address: "",
          state: "",
          city: "",
          zip: "",
          city_id: "",
        },
        permanent_address: {
          address: "",
          state: "",
          city: "",
          zip: "",
          city_id: "",
        },
        password: "********",
      },
    };
  }

  shouldComponentUpdate(props, newProps) {
    return true;
  }

  componentDidMount() {
    this.setState(
      (prev) =>
        (prev.userData = {
          ...this.props.userInfo,
          password: "**********",
          profile_image: this.props.userInfo.profile_image || "",
        })
    );
  }

  // let form = new FormData();
  updateMyProfile(form, data, parentkey) {
    try {
      Object.keys(data).forEach((item) => {
        if (typeof data[item] == "object") {
          this.updateMyProfile(form, data[item], item);
        } else {
          console.log(parentkey ? `${parentkey}[${item}]` : item);
          form.append(
            parentkey ? `${parentkey}[${item}]` : item,
            data[item] == null ? "" : data[item]
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  uploadImage(e) {
    let data = new FormData();

    data.append("profile_image", e);
    data.append("email", this.state.email);

    axios.put("http://localhost:4000/users/upload_profile_image", data);
  }

  render() {
    return (
      <div className="row">
        <div className="col-3 d-md-block d-none"></div>
        <div className="col-md-9 col-12">
          <Formik
            initialValues={this.state.userData}
            enableReinitialize={true}
            onSubmit={async (value) => {
              // alert(value);
              // this.props.login(value);
              let formdata = new FormData();
              this.updateMyProfile(formdata, value);
              console.log(formdata.get("current_address[country]"));
              axios.post("http://localhost:4000/updateProfile", formdata);
            }}
          >
            {({
              values,
              isSubmitting,
              errors,
              touched,
              dirty,
              setFieldValue,
            }) => (
              <Form className="h-100 p-4 col-md-6 col-12">
                <div className="col-auto text-center mb-4">
                  <label htmlFor="profileImge">
                    <img
                      src={
                        typeof values?.profile_image == "object"
                          ? URL.createObjectURL(values.profile_image)
                          : values?.profile_image
                      }
                      width="200px"
                      height="200px"
                      style={{ objecrFit: "contain" }}
                      className="rounded-pill"
                      alt=""
                    />
                    <input
                      type="file"
                      className="visually-hidden"
                      id="profileImge"
                      accept="image/*"
                      name="profile_image"
                      onChange={(e) =>
                        e.target.files[0] &&
                        setFieldValue(
                          "profile_image",
                          e.target.files[0],
                          this.uploadImage(e.target.files[0])
                        )
                      }
                    />
                  </label>
                </div>
                <div className="row w-100">
                  {/* First Name & Last Name */}
                  <div className="col-6 mb-3">
                    <label htmlFor="first_name" className="w-100">
                      First Name
                      <Field
                        type="text"
                        className="form-control form-control-lg mt-2"
                        id="first_name"
                        placeholder="First Name"
                        name="first_name"
                      />
                    </label>
                    <span className="text-danger">
                      <ErrorMessage name="first_name" />
                    </span>
                  </div>
                  {/* Last Name */}
                  <div className="col-6 mb-3">
                    <label htmlFor="last_name" className="w-100">
                      Last Name
                      <Field
                        type="text"
                        className="form-control form-control-lg mt-2"
                        id="last_name"
                        placeholder="Last Name"
                        name="last_name"
                      />
                    </label>
                    <span className="text-danger">
                      <ErrorMessage name="last_name" />
                    </span>
                  </div>
                  {/* Emial */}
                  <div className="col-12 mb-3">
                    <label htmlFor="staticEmail2" className="w-100">
                      Email
                      <Field
                        type="text"
                        className="form-control form-control-lg mt-2"
                        id="staticEmail2"
                        placeholder="Email"
                        name="email"
                      />
                    </label>
                    <span className="text-danger">
                      <ErrorMessage name="email" />
                    </span>
                  </div>
                  {/* contact number */}
                  <div className="col-12 mb-3">
                    <label htmlFor="contact_number" className="w-100">
                      Contact Number
                      <Field
                        type="text"
                        className="form-control form-control-lg mt-2"
                        id="contact_number"
                        placeholder="Contact Number"
                        name="contact"
                      />
                    </label>
                    <span className="text-danger">
                      <ErrorMessage name="contact_number" />
                    </span>
                  </div>

                  {/* Current Address */}
                  <>
                    <div className="heading">
                      <h2>Current Address</h2>
                    </div>
                    {/* Address */}
                    <div className="col-12 mb-3">
                      <label htmlFor="address" className="w-100">
                        Address
                        <Field
                          type="text"
                          className="form-control form-control-lg mt-2"
                          id="address"
                          placeholder="Address"
                          name="current_address.address"
                        />
                      </label>
                      <span className="text-danger">
                        <ErrorMessage name="current_address.address" />
                      </span>
                    </div>

                    {/* zip code */}
                    <div className="col-6 mb-3">
                      <label htmlFor="zip" className="w-100">
                        Zip
                        <Field
                          type="text"
                          className="form-control form-control-lg mt-2"
                          id="zip"
                          placeholder="zip"
                          name="current_address.zip"
                        />
                      </label>
                      <span className="text-danger">
                        <ErrorMessage name="current_address.zip" />
                      </span>
                    </div>

                    {/* Address city state zip  */}
                    <div className="col-6 mb-3">
                      <label htmlFor="city" className="w-100">
                        State
                        <Field
                          type="text"
                          disabled
                          className="form-control form-control-lg mt-2"
                          id="state"
                          placeholder="State"
                          name="current_address.state"
                        />
                      </label>
                      <span className="text-danger">
                        <ErrorMessage name="current_address.state" />
                      </span>
                    </div>

                    {/* State */}
                    <div className="col-6 mb-3">
                      <label htmlFor="city" className="w-100">
                        City
                        <Field
                          type="text"
                          disabled
                          className="form-control form-control-lg mt-2"
                          id="city"
                          placeholder="city"
                          name="current_address.city"
                        />
                      </label>
                      <span className="text-danger">
                        <ErrorMessage name="current_address.city" />
                      </span>
                    </div>

                    {/* country */}
                    <div className="col-6 mb-3">
                      <label htmlFor="country" className="w-100">
                        Country
                        <Field
                          type="text"
                          disabled
                          className="form-control form-control-lg mt-2"
                          id="country"
                          placeholder="country"
                          name="current_address.country"
                        />
                      </label>
                      <span className="text-danger">
                        <ErrorMessage name="current_address.country" />
                      </span>
                    </div>
                  </>

                  {/* Permanent Address */}
                  <>
                    <div className="heading">
                      <h2>Permanent Address</h2>
                    </div>
                    {/* Address */}
                    <div className="col-12 mb-3">
                      <label htmlFor="address" className="w-100">
                        Address
                        <Field
                          type="text"
                          className="form-control form-control-lg mt-2"
                          id="address"
                          placeholder="Address"
                          name="permanent_address.address"
                        />
                      </label>
                      <span className="text-danger">
                        <ErrorMessage name="permanent_address.address" />
                      </span>
                    </div>

                    {/* zip code */}
                    <div className="col-6 mb-3">
                      <label htmlFor="zip" className="w-100">
                        Zip
                        <Field
                          type="text"
                          className="form-control form-control-lg mt-2"
                          id="zip"
                          placeholder="zip"
                          name="permanent_address.zip"
                        />
                      </label>
                      <span className="text-danger">
                        <ErrorMessage name="permanent_address.zip" />
                      </span>
                    </div>

                    {/* Address city state zip  */}
                    <div className="col-6 mb-3">
                      <label htmlFor="city" className="w-100">
                        State
                        <Field
                          type="text"
                          disabled
                          className="form-control form-control-lg mt-2"
                          id="state"
                          placeholder="State"
                          name="permanent_address.state"
                        />
                      </label>
                      <span className="text-danger">
                        <ErrorMessage name="permanent_address.state" />
                      </span>
                    </div>

                    {/* State */}
                    <div className="col-6 mb-3">
                      <label htmlFor="city" className="w-100">
                        City
                        <Field
                          type="text"
                          disabled
                          className="form-control form-control-lg mt-2"
                          id="city"
                          placeholder="city"
                          name="permanent_address.city"
                        />
                      </label>
                      <span className="text-danger">
                        <ErrorMessage name="permanent_address.city" />
                      </span>
                    </div>

                    {/* country */}
                    <div className="col-6 mb-3">
                      <label htmlFor="country" className="w-100">
                        Country
                        <Field
                          type="text"
                          disabled
                          className="form-control form-control-lg mt-2"
                          id="country"
                          placeholder="country"
                          name="permanent_address.country"
                        />
                      </label>
                      <span className="text-danger">
                        <ErrorMessage name="country" />
                      </span>
                    </div>
                  </>

                  <div className="col-12 mb-3">
                    <label htmlFor="password" className="w-100">
                      Password
                      <Field
                        type="text"
                        className="form-control form-control-lg mt-2"
                        id="password"
                        placeholder="password"
                        name="password"
                        disabled
                      />
                    </label>
                    <span className="text-danger">
                      <ErrorMessage name="password" />
                    </span>
                  </div>
                </div>
                <div className="col-12 py-3">
                  <button
                    type="reset"
                    className="btn btn-secondary px-5 py-3 me-3"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary px-5 py-3">
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth?.userInfo?.userProfileInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
