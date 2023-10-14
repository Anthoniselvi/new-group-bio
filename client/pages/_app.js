import React from "react";
import App from "next/app";
import Router from "next/router";
import Layout from "@/components/Layout";
import { ApiContextProvider } from "@/context/GroupContext";

class MyApp extends App {
  constructor() {
    super();
    this.state = {
      userLoggedIn: false,
    };
  }

  componentDidMount() {
    // Scroll to top when navigating to a new page
    Router.events.on("routeChangeComplete", () => {
      window.scrollTo(0, 0);
    });
  }

  handleLogin = () => {
    // You can implement your login logic here
    // If login is successful, update userLoggedIn state
    this.setState({ userLoggedIn: true });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ApiContextProvider>
        <Layout userLoggedIn={this.state.userLoggedIn}>
          <Component {...pageProps} onLogin={this.handleLogin} />
        </Layout>
      </ApiContextProvider>
    );
  }
}

export default MyApp;
