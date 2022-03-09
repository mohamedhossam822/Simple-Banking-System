import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTransactions } from "../requests";
import { Table, Space, Button } from "antd";
import "antd/dist/antd.css";
export const Transactions = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        const transaction = [];
        for (let i = data.length - 1; i >= 0; i--) {
          transaction.push({
            id: data[i].user._id,
            name: data[i].user.name,
            oldBalance: data[i].newBalance - data[i].transferedFunds,
            transferedFunds: data[i].transferedFunds,
            newBalance: data[i].newBalance,
            date: new Date(data[i].date).toUTCString(),
            dateMS: new Date(data[i].date).getTime(),
          });
        }
        setData(transaction);
      })
      .finally(() => setLoading(true));
  }, []);

  const visitUserPage = (id) => {
    navigate("/transactions/" + id);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
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
    {
      title: "Actions",
      key: "Actions",
      render: (text, user) => (
        <Space size="middle">
          <Button onClick={() => visitUserPage(user.id)}>
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
      <h1>Transactions</h1>
      {isLoading ? listItems : <div>Loading ...</div>}
    </div>
  );
};
