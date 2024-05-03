import React from "react";
import { Layout, theme } from "antd";
import TableDisplay from "../Components/TableDisplay";

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
          backgroundColor: "#001529", // Adjusted header background color
          color: "#ffffff", // Adjusted header text color
          padding: "0 16px", // Reduced padding for smaller screens
        }}
      ></Header>
      <Content
        style={{
          padding: "0 16px", // Reduced padding for smaller screens
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            padding: 16,
            margin: 16,
            borderRadius: borderRadiusLG,
          }}
        >
          <TableDisplay />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#001529",
          color: "#ffffff",
        }}
      >
        Post project ©{new Date().getFullYear()} Created by Vivek
      </Footer>
    </Layout>
  );
};

export default HomePage;
