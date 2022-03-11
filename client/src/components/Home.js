import React from "react";
import "antd/dist/antd.css";
import { Breadcrumb, Button, Space } from "antd";
import "../Styles/components.css";
export const Home = ({ handleClick }) => {
  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <div className="screenCenter">
        <h1>
          Welcome to oue simple banking website where you can view <br></br>our
          clients & their latest transactions !
        </h1>
        <br></br>
        <Space size="middle">
          <Button
            onClick={() => {
              handleClick({ key: "clients", external: true });
            }}
            key="clients"
            style={{ marginLeft: "33px" }}
            size="large"
          >
            Check Our Clients!
          </Button>
          <Button
            onClick={() => {
              handleClick({ key: "transactions", external: true });
            }}
            key="clients"
            size="large"
          >
            See Our Latest Transactions!
          </Button>
          <br></br>
        </Space>
        {/* <Button size="large">Make A transaction</Button> */}
      </div>
    </div>
  );
};
