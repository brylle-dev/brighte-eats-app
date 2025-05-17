import { useState } from "react";

import "./App.css";
import { gql, useQuery } from "@apollo/client";
import { getLeadById, getLeads } from "./graphql/queries";
import { Layout } from "antd";
const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

function App() {
  return (
    <Layout>
      <Header style={headerStyle}>HEADER</Header>
    </Layout>
  );
}

export default App;
