import React from "react";
import "antd/dist/antd.css";
import { Breadcrumb } from "antd";
export const Home = () => {
  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
      <h1>Home</h1>
    </div>
  );
};
