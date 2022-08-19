import React, { Component } from "react";
import { BsCalendar } from "react-icons/bs";
import { CgShoppingBag } from "react-icons/cg";
import { IoIosTrendingDown } from "react-icons/io";
import { AiOutlinePlus, AiOutlineSetting } from "react-icons/ai";
import Graph from "../Graph/Graph";
import NavCard from "../NavCard/NavCard";
import "./SummaryPage.css";
import { HistoryCards } from "../Cards/Cards";
import DatePicker from "../DatePicker/DatePicker";
import { Button } from "../Header/Header";

export default class SummaryPage extends Component {
  render() {
    return (
      <div className="row">
        <div className="border-bottom border-top bc">
          <nav className="navbar navbar-expand-sm justify-content-end navbar-light bg-white py-3">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent1"
              aria-controls="navbarSupportedContent1"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent1"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <span className="nav-link fw-bold h2 mb-0">
                    ACTIVITY SUMMARY
                  </span>
                </li>
                <li className="nav-item">
                  <span className="nav-link fw-bold h2 mb-0">
                    SPENDING SUMMARY
                  </span>
                </li>
                <li className="nav-item">
                  <span className="nav-link fw-bold h2 mb-0">
                    INCOME SUMMARY
                  </span>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="col-md-4 border-end bc">
          <div className="row mt-5">
            <div className="w-100">
              <span className="h6 m-0 text-muted">Activity Graph</span>
              <span className="float-end">
                <h4 className="text-end">$186.3K</h4>
                <span className="fs-7 text-muted">BETWEEN SEP 9-25</span>
              </span>
            </div>
          </div>
          <div>
            <Graph />
          </div>
          <div className="pt-3">
            <div className="py-3">
              <NavCard
                card_bg="#eceafe"
                icon={<BsCalendar />}
                title="Monthly Plans"
                path="/monthly-plans"
              />
            </div>
            <div className="py-3">
              <NavCard
                card_bg="#eceafe"
                icon={<AiOutlineSetting />}
                title="Settings"
                path="/settings"
              />
            </div>
            <div className="py-3">
              <NavCard
                card_bg="#eceafe"
                icon={<IoIosTrendingDown />}
                title="Goal"
                path="/goals"
              />
            </div>
            <div className="py-3">
              <NavCard
                card_bg="#eceafe"
                icon={<CgShoppingBag />}
                title="Shopping"
                path="/shopping"
              />
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="mt-5 row">
            <div className="col-12 px-4">
              <div className="d-flex">
                <div className="border-bottom bc flex-grow-1">
                  <span
                    role={"button"}
                    className="h6 px-3 pb-3 mb-0 text-center active d-inline-block"
                  >
                    History
                  </span>
                  <span
                    role={"button"}
                    className="h6 px-3 pb-3 mb-0 text-center d-inline-block"
                  >
                    Upcomming
                  </span>
                </div>
                <div className="d-flex">
                  <div className="">
                    <DatePicker onChange={() => {}} value={new Date()} />
                  </div>
                  <div className="px-3">
                    <Button className="nav-link rounded-5 bg-white border">
                      <AiOutlineSetting />
                    </Button>
                  </div>
                  <div className="">
                    <NavCard
                      card_bg="#eceafe"
                      icon={<AiOutlinePlus />}
                      show_content={true}
                      path="#"
                      className="px-2 py-2"
                    />
                  </div>
                </div>
              </div>
              <div className="w-100">
                {[
                  {
                    date: "13 Sep, 2020",
                    details_arr: [
                      {
                        DateSummary: "Office Supplies",
                        summary_date: "13 Sep, 2020 at 3:30 PM",
                        type: "Supplies",
                        amount: "-$10,100.00",
                        bgColor: "#fef5f4",
                      },
                    ],
                  },
                  {
                    date: "14 Sep, 2020",
                    details_arr: [
                      {
                        DateSummary: "Park Transfer",
                        summary_date: "14 Sep, 2020 at 3:30 PM",
                        type: "Marketing",
                        amount: "-$1,100.00",
                        bgColor: "#fef5f4",
                      },
                      {
                        DateSummary: "Sallary Transfer",
                        summary_date: "14 Sep, 2020 at 3:30 PM",
                        type: "Office Supplies",
                        amount: "-$14,100.00",
                        bgColor: "#fef5f4",
                      },
                      {
                        DateSummary: "Cash Withdrawl",
                        summary_date: "14 Sep, 2020 at 3:30 PM",
                        type: "General Banking",
                        amount: "-$15,100.00",
                        bgColor: "#fef5f4",
                      },
                    ],
                  },
                  {
                    date: "15 Sep, 2020",
                    details_arr: [
                      {
                        DateSummary: "Park Transfer",
                        summary_date: "15 Sep, 2020 at 3:30 PM",
                        type: "Marketing",
                        amount: "-$1,100.00",
                        bgColor: "#fef5f4",
                      },
                      {
                        DateSummary: "Target",
                        summary_date: "15 Sep, 2020 at 3:30 PM",
                        type: "Equipment",
                        amount: "-$1,100.00",
                        bgColor: "#fef5f4",
                      },
                    ],
                  },
                ].map((item, index) => (
                    <HistoryCards
                      date={item.date}
                      key={index}
                      index={index}
                      details_arr={item.details_arr}
                    />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
