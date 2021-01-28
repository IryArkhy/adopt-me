import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

// https://reactjs.org/docs/error-boundaries.html

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  // a react method so it can be a regular function
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  // you can also replace componentDidCath with componentdidUpdate

  // to clean up things before the component leaves the DOM. Но сначала сработает getDerivedStateFromError и изменит стейт сообщая, что есть ошибка
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page or wait five seconds.
        </h1>
      );
    }
    // если нет ошибки: просто передай дальше всех своих детей и потомков
    return this.props.children;
  }
}

export default ErrorBoundary;
