import React from "react";
import { connect } from "react-redux";
import { errorLogger } from "../../store/Actions/ErrorLogs/ErrorLogger";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.props.logErrorToMyService(error, errorInfo);
  }

  shouldComponentUpdate(props,newProps) {
    return true;
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  logErrorToMyService: (data, otherInfo) => errorLogger(data, otherInfo),
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
