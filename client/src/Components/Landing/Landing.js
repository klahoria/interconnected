import React, { Component } from "react";
import { connect } from "react-redux";
import WithHeader from "../../HOC/WithHeader";
import Card from "../PaymentCard/Card";
import "./Landing.css";
// card
// import { FiSearch } from "react-icons/fi";
import { BsColumnsGap, BsGraphUp } from "react-icons/bs";
import StatCard from "../StatCard/StatCard";
import { IoIosTrendingDown } from "react-icons/io";
import { TiChartBar } from "react-icons/ti";
import { CgShoppingBag } from "react-icons/cg";
import SummaryPage from "../SummaryPage/SummaryPage";
import { FiDownload, FiUpload } from "react-icons/fi";
import { SiBinance, SiLitecoin } from "react-icons/si";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import Cards, { RealtimeCards } from "../Cards/Cards";

export class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // console.log(this.props.state);
  }

  render() {
    return (
      <>
        <div className="col-lg-9 col-12 bg-white">
          <div className="row flex-wrap pb-5">
            {/* top Area 1 stats */}
            <div className="col-md-3 col-12">
              <div className="h-100 d-flex flex-column justify-content-between">
                <StatCard
                  card_bg="#9ccea6"
                  icon={<BsGraphUp />}
                  title="Total Earnings"
                  amount={"12,222,34.00"}
                />
                <StatCard
                  card_bg="#f0f3de"
                  icon={<BsColumnsGap />}
                  title="Goal For This Month"
                  amount={"12,222,34.00"}
                />
              </div>
            </div>
            {/* top Area 2 card */}
            <div className="col-md-6 col-12">
              <Card
                last4={"1234"}
                name="kumar"
                cvv="345"
                exp={"12/34"}
                type="Visa"
              />
            </div>
            {/* top Area 3 stats */}
            <div className="col-md-3 col-12">
              <div className="h-100 d-flex flex-column justify-content-between">
                <StatCard
                  card_bg="#ffc994"
                  icon={<IoIosTrendingDown />}
                  title="Total Earnings"
                  amount={"12,222,34.00"}
                />
                <StatCard
                  card_bg="#bbecff"
                  icon={<CgShoppingBag />}
                  title="Goal For This Month"
                  amount={"12,222,34.00"}
                />
              </div>
            </div>
          </div>

          <SummaryPage />
        </div>
        <div className="col-lg-3 col-12 ">
          {/* card */}
          <div
            className="w-100 rounded-4 p-3 form-floating"
            style={{
              background: "url(img/png/card_bg.png)",
              backgroundSize: "100% 170%",
              boxShadow: "0px 15px 70px -55px black",
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <p className="text-white fw-bold mb-0">My Portfolio </p>
              <span className="text-white float-end fs-5 px-1 border rounded-3">
                <TiChartBar />
              </span>
            </div>
            <div className="amount d-flex align-items-center justify-content-between py-2">
              <h2 className="text-white">$34,010.00</h2>
              <p className="text-white mb-0">+2,5%</p>
            </div>
            {/* buttons card */}
            <div className="button_colm text-center">
              <button
                className="btn btn-light px-lg-4 rounded-pill rounded-lg-0"
                style={{ marginBottom: "-40px" }}
              >
                <span className="pe-2 fw-bold">
                  <FiDownload />
                </span>
                <span className="fw-bold">Deposite</span>
              </button>
              <button
                className="btn btn-light px-lg-4 rounded-pill rounded-lg-0 ms-3"
                style={{ marginBottom: "-40px" }}
              >
                <span className="pe-2 fw-bold">
                  <FiUpload />
                </span>
                <span className="fw-bold">Withdraw</span>
              </button>
            </div>
            {/* Updates */}
          </div>
          <div className="mt-4">
            <div className="w-100 py-3">
              <span className="fw-bold">Favorites</span>
              <span className="fw-semibold float-end text-primary">
                View All
              </span>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Cards />
              </div>
              <div className="col-md-6">
                <Cards />
              </div>

              <div className="col-12 mt-4">
                <RealtimeCards
                  short_name="BNB"
                  fullName="Binance"
                  icon={<SiBinance />}
                />
                <RealtimeCards
                  short_name="LTC"
                  fullName="Litecoin"
                  icon={<SiLitecoin />}
                />
                <RealtimeCards
                  short_name="ETH"
                  fullName="Ethereum"
                  icon={<FaEthereum />}
                />
                <RealtimeCards
                  short_name="BTC"
                  fullName="Bitcoin"
                  icon={<FaBitcoin />}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithHeader(Landing, mapStateToProps().state));
