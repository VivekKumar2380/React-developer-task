import React from "react";
import { Layout, theme } from "antd";
import TableDisplay from "./TableDisplay";

const { Header, Content, Footer } = Layout;
const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        {/* <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={['1']}
          items="Home"
          style={{
            flex: 1,
            minWidth: 0,
          }}
        /> */}
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            margin: 24,
            borderRadius: borderRadiusLG,
          }}
        >
         <TableDisplay/>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Post project ©{new Date().getFullYear()} Created by Vivek
      </Footer>
    </Layout>
  );
};

export default HomePage;
