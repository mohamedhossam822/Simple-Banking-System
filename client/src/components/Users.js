import React, { useEffect, useState } from "react";
import { fetchData, makeATransaction } from "../requests";
import { Table, Space, Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.css";
export const Users = () => {
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
    fetchData()
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
    fetchData().then((data) => {
      setData(data);
    });
    setCurrentId(null);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setCurrentId(null);
    setIsModalVisible(false);
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
      <h1>Users</h1>
      {isLoading ? listItems : <div>Loading ...</div>}
      {newModal}
    </div>
  );
};
