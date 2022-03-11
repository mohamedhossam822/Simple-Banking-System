import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TransactionModal } from "./TransactionModal";
import { fetchClients, makeATransaction } from "../requests";
import { Table, Space, Button, Breadcrumb } from "antd";
import "antd/dist/antd.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

///////// Pop-up Messsages Config /////////
toast.configure();

export const Users = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [errMessage, setErrMessage] = useState({
    validateStatus: "success",
    errorMsg: null,
  });

  const defaultErrMessage = { validateStatus: "success", errorMsg: null };

  useEffect(() => {
    fetchClients()
      .then((data) => {
        setData(data);
      })
      .finally(() => setLoading(true));
  }, []);

  const showModal = (id) => {
    setErrMessage(defaultErrMessage);
    setCurrentId(id);
    setIsModalVisible(true);
  };

  const handleOk = async (funds) => {
    setErrMessage(defaultErrMessage);
    //Make the transaction
    const res = await makeATransaction(currentId, funds);
    if (res.message) {
      toast.info(res.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.info("Transaction Failed", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    fetchClients().then((data) => {
      setData(data);
    });
    setCurrentId(null);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setCurrentId(null);
    setIsModalVisible(false);
  };

  const visitUserPage = (id) => {
    navigate("/transactions/" + id);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: "Actions",
      key: "Actions",
      render: (text, user) => (
        <Space size="middle">
          <Button onClick={() => showModal(user._id)}>
            Transfer funds to {user.name}
          </Button>
          <Button onClick={() => visitUserPage(user._id)}>
            Go to {user.name} Page
          </Button>
        </Space>
      ),
    },
  ];

  /****mini-Components****/
  const listItems = (
    <Table
      pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
      dataSource={data}
      columns={columns}
    />
  );

  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Clients</Breadcrumb.Item>
      </Breadcrumb>
      {isLoading ? listItems : <div>Loading ...</div>}
      <TransactionModal
        isModalVisible={isModalVisible}
        errMessage={errMessage}
        setErrMessage={setErrMessage}
        handleOk={handleOk}
        handleCancel={handleCancel}
      ></TransactionModal>
    </div>
  );
};
