import React from "react";
import { Tabs, Layout } from "antd";
import SchemaBuilder from "./components/SchemaBuilder";

const { Header, Content } = Layout;
const { TabPane } = Tabs;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ display: "flex", height: "100%" }}>
        <SchemaBuilder />
      </Content>
    </Layout>
  );
}

export default App;
