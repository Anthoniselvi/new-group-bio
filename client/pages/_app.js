import React from "react";
import App from "next/app";
import Router from "next/router";
import Layout from "@/components/Layout";
import "../styles/globals.css";
import { ApiContextProvider } from "@/context/GroupContext";

class MyApp extends App {
  // Remove the constructor and state as it's not needed for this approach

  componentDidMount() {
    // Scroll to top when navigating to a new page
    Router.events.on("routeChangeComplete", () => {
      window.scrollTo(0, 0);
    });
  }

  handleLogin = () => {
    // You can implement your login logic here
    // If login is successful, you can use the context to update the login state
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ApiContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApiContextProvider>
    );
  }
}

export default MyApp;
