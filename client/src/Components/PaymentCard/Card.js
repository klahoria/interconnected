import { Offcanvas } from "bootstrap";
import React, { Component } from "react";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Card.css";
import SideBar from '../StyledComponents/OffCanvas/SideBar'

export default class Card extends Component {
  render() {
    let { last4, name, type, exp, cvv } = this.props;
    return (
      <>
        {this.props.account_info && (
          <div className="card_payment rounded-4 px-4 py-3 mx-auto">
            <div className="row justify-content-between ">
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <div className="fs-7 fw-bold">Name Card</div>
                    <div className="fs-5 fw-bold">{name}</div>
                  </div>
                  <div className="col-6">
                    <h4 className="fw-bold float-end">{type}</h4>
                  </div>
                </div>
              </div>
              <div className="col-12 ps-center fw-bold h5 card_number">
                <span>**** **** **** {last4}</span>
              </div>

              <div className="col-12 ps-center">
                <div className="row">
                  <div className="col-6">
                    <span className="text-muted fw-bold fs-7">EXP DATE</span>
                    <div className="fs-7 fw-bold">{exp}</div>
                  </div>
                  <div className="col-6">
                    <span className="text-muted fw-bold fs-7">CVV NUMBER </span>
                    <div className="fs-7 fw-bold">{cvv}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!this.props.account_info && (
          <div className="text-center w-100 py-3">
            <span className="fs-1 mb-0">
              <BsFillExclamationTriangleFill />
              <p className="fs-4 fw-bold mb-0">
                Please Update Your Account Info.
                <br />
                  <SideBar />
                <Link className="fs-6" to=""  data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                  Upadte Account
                </Link>
              </p>
            </span>
          </div>
        )}
      </>
    );
  }
}
