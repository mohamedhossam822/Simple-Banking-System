import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserTransactions, makeATransaction } from "../requests";
import { Table, Breadcrumb, Button } from "antd";
import { TransactionModal } from "./TransactionModal";
import "../Styles/components.css";
import "antd/dist/antd.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

///////// Pop-up Messsages Config /////////
toast.configure();

export const UserTransactions = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [currentBalance, setCurrentBalance] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errMessage, setErrMessage] = useState({
    validateStatus: "success",
    errorMsg: null,
  });
  const defaultErrMessage = { validateStatus: "success", errorMsg: null };

  useEffect(() => {
    fetchUserTransactions(id)
      .then((data) => {
        setName(data.name);
        document.title = data.name;
        setCurrentBalance(data.balance);
        setData(processData(data));
      })
      .finally(() => setLoading(true));
  }, [id]);

  const processData = (data) => {
    const transaction = [];
    for (let i = data.transactions.length - 1; i >= 0; i--) {
      transaction.push({
        oldBalance:
          data.transactions[i].newBalance -
          data.transactions[i].transferedFunds,
        transferedFunds: data.transactions[i].transferedFunds,
        newBalance: data.transactions[i].newBalance,
        date: new Date(data.transactions[i].date).toUTCString(),
        dateMS: new Date(data.transactions[i].date).getTime(),
      });
    }
    return transaction;
  };
  const columns = [
    {
      title: "Balance before transaction",
      dataIndex: "oldBalance",
      key: "oldBalance",
    },
    {
      title: "Transfered Funds",
      dataIndex: "transferedFunds",
      key: "transferedFunds",
      sorter: (a, b) => a.transferedFunds - b.transferedFunds,
    },
    {
      title: "Balance after transaction",
      dataIndex: "newBalance",
      key: "newBalance",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sortDirections: ["ascend"],
      sorter: (a, b) => a.dateMS - b.dateMS,
    },
  ];

  /**** Modal Functions****/

  const showModal = () => {
    setErrMessage(defaultErrMessage);
    setIsModalVisible(true);
  };

  const handleOk = async (funds) => {
    setErrMessage(defaultErrMessage);
    //Make the transaction
    const res = await makeATransaction(id, funds);
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
    fetchUserTransactions(id).then((data) => {
      setName(data.name);
      setCurrentBalance(data.balance);
      setData(processData(data));
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
        <Breadcrumb.Item>Transactions</Breadcrumb.Item>
        <Breadcrumb.Item>{name}</Breadcrumb.Item>
      </Breadcrumb>
      <span style={{ float: "left" }}>
        <h3>Current Balance : {currentBalance}</h3>
      </span>
      <span className="RightButton">
        <Button onClick={() => showModal()}>Transfer funds</Button>
      </span>
      <br></br>
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
