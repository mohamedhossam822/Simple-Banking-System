import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchClients, makeATransaction } from "../requests";
import { Table, Space, Button, Modal, Form, Input,Breadcrumb } from "antd";
import "antd/dist/antd.css";
export const Users = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [form] = Form.useForm();
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

  /***Validate***/
  const ValidateFunds = (Funds) => {
    //Validate if it exists & its a number
    if (isNaN(Funds) || Funds === "")
      return {
        validateStatus: "error",
        errorMsg: "Please, Enter a valid number of funds",
      };
    //Validate its bigger than 0
    if (Funds <= 0)
      return {
        validateStatus: "error",
        errorMsg: "Enter a number bigger than 0!",
      };

    return defaultErrMessage;
  };

  /****mini-Components****/
  const listItems = (
    <Table
      pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
      dataSource={data}
      columns={columns}
    />
  );

  const newForm = (
    <Form form={form} layout="vertical" name="form_in_modal">
      <Form.Item
        name="Funds"
        label="Funds"
        validateStatus={errMessage.validateStatus}
        help={errMessage.errorMsg}
      >
        <Input />
      </Form.Item>
    </Form>
  );

  const newModal = (
    <Modal
      title="New Transaction"
      visible={isModalVisible}
      onOk={() => {
        form.validateFields().then((values) => {
          const result = ValidateFunds(values.Funds);
          if (result.validateStatus === "error") {
            setErrMessage(result);
          } else handleOk(values.Funds);
        });
      }}
      onCancel={handleCancel}
    >
      {newForm}
    </Modal>
  );

  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Clients</Breadcrumb.Item>
        </Breadcrumb>
      {isLoading ? listItems : <div>Loading ...</div>}
      {newModal}
    </div>
  );
};
