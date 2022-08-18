import React, { Component } from "react";
import { FaChevronRight } from "react-icons/fa";
// import { BsGraphUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./NavCard.css";

export default class NavCard extends Component {
  render() {
    return (
      (this.props.title || this.props.show_content) && (
        <Link
          to={this.props.path}
          className="w-100 text-decoration-none"
          role="button"
        >
          <div className="w-100 d-flex align-items-center justify-content-start">
            <span
              className={
                `d-inline-block rounded-4 p-3 card_icon c_blue ` +
                this.props.className
              }
              style={{
                backgroundColor: this.props.card_bg,
              }}
            >
              {this.props.icon}
            </span>
            {!this.props.show_content && (
              <>
                <div className="box_card_data px-3">
                  <div className="text-dark">
                    {this.props.title && <h5>{this.props.title} </h5>}
                  </div>
                </div>
                <div className="flex-grow-1 text-center px-4">
                  <span className="float-end fw-bold text-dark">
                    <FaChevronRight />
                  </span>
                </div>
              </>
            )}
          </div>
        </Link>
      )
    );
  }
}
