import React, { Component } from "react";
// import { BsGraphUp } from "react-icons/bs";
import "./StatCard.css";

export default class StatCard extends Component {
  render() {
    return (
      this.props.amount && (
        <div className="w-100" role="button">
          <div className="w-100 d-flex align-items-center justify-content-start">
            <span
              className="d-inline-block rounded-4 p-3 card_icon"
              style={{
                backgroundColor: this.props.card_bg,
              }}
            >
              {this.props.icon}
            </span>
            <div className="box_card_data px-3">
              <div className="sub_title text-muted pt-2">
                <p className="mb-0">
                  <>{this.props.title}</>
                </p>
              </div>
              <div>{this.props.amount && <h5>${this.props.amount}</h5>}</div>
            </div>
          </div>
        </div>
      )
    );
  }
}
