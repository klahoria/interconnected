import React, { Component } from "react";
import { AiOutlineCreditCard, AiOutlineVerticalAlignTop } from "react-icons/ai";
import { BsArrowLeftRight } from "react-icons/bs";
import { CgPushDown } from "react-icons/cg";
import { FaBtc } from "react-icons/fa";
import { AttachmentButton } from "../Button/Button";
import { LineGraph } from "../Graph/Graph";
import "./Cards.css";

export default class Cards extends Component {
  render() {
    return (
      <div className="card border-0 rounded-5">
        <div className="card-body">
          <h5 className="card-title d-flex">
            <span
              className="bg-dark text-white d-inline-block rounded-pill d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px" }}
            >
              {this.props.icon || <FaBtc />}
            </span>
            <span className="title_card fs-6 px-3">
              <p className="mb-0">BTC</p>
              <p className="fs-7 text-muted">Bitcoin</p>
            </span>
          </h5>
          <p className="card-text">
            <LineGraph></LineGraph>
          </p>
          <span className="text-dark fw-bold" style={{ color: "#7cdba7" }}>
            $20,788
          </span>
          <span className="float-end" style={{ color: "#7cdba7" }}>
            +0.25%
          </span>
        </div>
      </div>
    );
  }
}

export class HistoryCards extends Component {
  render() {
    return (
      <div
        key={this.props.key_value}
        className={`histroy_tracer ${this.props.index === 0 ? "mt-5" : "mt-2"}`}
      >
        <div className="date fs-7 fw-bold text-muted">
          <span>{this.props.date}</span>
        </div>
        {this.props.details_arr.map((item) => (
          <div
            className="py-3 d-flex align-items-top justify-content-start flex-wrap"
            key={item.type + item.summary_date}
          >
            <div className="px-3">
              {item.type === "Supplies" ? (
                <BsArrowLeftRight />
              ) : item.type === "Office Supplies" ? (
                <BsArrowLeftRight />
              ) : item.type === "General Banking" ? (
                <CgPushDown />
              ) : item.type === "Equipment" ? (
                <AiOutlineCreditCard />
              ) : item.type === "Marketing" ? (
                <AiOutlineVerticalAlignTop />
              ) : (
                ""
              )}
            </div>
            <div className="px-4 flex-grow-1">
              <div className="title fs-6 fw-bold">{item.DateSummary}</div>
              <div className="fs-7 text-muted fw-normal">
                {item.summary_date}
              </div>
            </div>
            <div className="status flex-grow-1">
              <label
                className="p-3 rounded-2"
                style={{
                  backgroundColor:
                    item.type === "Supplies"
                      ? "#fef5f4"
                      : item.type === "Office Supplies"
                      ? "#fbf4fe"
                      : item.type === "General Banking"
                      ? "#f0faf5"
                      : item.type === "Equipment"
                      ? "#fff9f3"
                      : item.type === "Marketing"
                      ? "#f0faf5"
                      : "",
                }}
              >
                <div className="d-flex align-items-center">
                  <span
                    className="rounded-pill text-danger"
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor:
                        item.type === "Supplies"
                          ? "#eb5743"
                          : item.type === "Office Supplies"
                          ? "#c148eb"
                          : item.type === "General Banking"
                          ? "#0ea7b1"
                          : item.type === "Equipment"
                          ? "#fe8e27"
                          : item.type === "Marketing"
                          ? "#2b00d4"
                          : "",
                    }}
                  ></span>
                </div>
              </label>
              <span className="px-3 fw-bold">{item.type}</span>
            </div>
            <div className="flex-grow-1 text-end">
              <AttachmentButton />
              <span
                className="price px-3 d-inline-block"
                role="button"
                style={{ minWidth: "120px" }}
              >
                <span className="fw-bold fs-6 text-start">{item.amount}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export class RealtimeCards extends Component {
  render() {
    return (
      <div className="card border-0 rounded-0 bg-transparent flex-wrap">
        <div className="card-body d-flex align-items-center flex-wrap">
          <h5 className="card-title d-flex align-items-center flex-grow-1">
            <span
              className="bg-dark text-white d-inline-block rounded-pill d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px" }}
            >
              {this.props.icon || <FaBtc />}
            </span>
            <span className="title_card fs-6 px-3">
              <p className="mb-1">{this.props.fullName || "Bitcoin"}</p>
              <p className="fs-7 mb-0 text-muted">
                {this.props.short_name || "BTC"}
              </p>
            </span>
          </h5>
          <p className="card-text " style={{ maxWidth: "30%" }}>
            <LineGraph></LineGraph>
          </p>
          <div className="flex-grow-1 ms-3">
            <span className="text-dark fw-bold" style={{ color: "#7cdba7" }}>
              {this.props.amount || "$1234"}
            </span>
            <span className="float-end" style={{ color: "#7cdba7" }}>
              {this.props.financeStatus || "+0.25%"}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
