import React from "react";
import App from "next/app";
import Router from "next/router";
import Layout from "@/components/Layout";
import "../styles/globals.css";
import { ApiContextProvider } from "@/context/GroupContext";

class MyApp extends App {
  componentDidMount() {
    Router.events.on("routeChangeComplete", () => {
      window.scrollTo(0, 0);
    });
  }

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
