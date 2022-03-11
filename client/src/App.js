import { Users, Home, Transactions, UserTransactions } from "./components";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./Styles/mainPage.css";
import { useEffect, useState } from "react";
const { Header, Content, Footer } = Layout;

function App() {
  const navigate = useNavigate();
  const [windowDimensions, setwindowHeight] = useState(window.innerHeight);
  const pageUrl = window.location.pathname.substring(1);
  const [currentPage, setCurrentPage] = useState(
    pageUrl === "" ? "Home" : pageUrl
  );
  const handleClick = async (e) => {
    setCurrentPage(e.key);
    navigate("/" + e.key);
    if (e.external) window.location.reload(false);
  };

  useEffect(() => {
    document.title = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
    function handleResize() {
      setwindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPage]);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ float: "right" }}
          onClick={handleClick}
          defaultSelectedKeys={currentPage}
        >
          <Menu.Item key="Home">Home</Menu.Item>
          <Menu.Item key="clients">Clients</Menu.Item>
          <Menu.Item key="transactions">Transactions</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div
          className="site-layout-content"
          style={{ minHeight: windowDimensions - 135 }}
        >
          <Routes>
            <Route
              exact
              path="/Home"
              key="Home"
              element={<Home handleClick={handleClick} />}
            ></Route>
            <Route
              exact
              path="/"
              key="Home"
              element={<Home handleClick={handleClick} />}
            ></Route>
            <Route
              exact
              path="/clients"
              key="clients"
              element={<Users />}
            ></Route>
            <Route
              exact
              path="/transactions"
              key="transactions"
              element={<Transactions />}
            ></Route>
            <Route
              exact
              path="/transactions/:id"
              element={<UserTransactions />}
            ></Route>
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Banking app ©2022 Created by Mohamed Hossam
      </Footer>
    </Layout>
  );
}

export default App;
