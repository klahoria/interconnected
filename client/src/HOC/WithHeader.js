import React from "react";
import Header from "../Components/Header/Header";
import "./WithHeader.css";

function WithHeader(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        // "DataSource" is some global data source
        component: this.props.children,
      };
    }

    componentDidMount() {
      // Subscribe to changes
      // DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      // Clean up listener
      // DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      // Update component state whenever the data source changes
      this.setState({});
    }

    render() {
      console.log(selectData);
      return (
        <div className="px-0">
          {/* other Details */}
          <div className="row">
            <Header></Header>
          </div>
          <div
            className="row main_container"
            style={{ minHeight: window.innerHeight - 75 }}
          >
            <WrappedComponent></WrappedComponent>
          </div>
        </div>
      );
    }
  };
}

export default WithHeader;
