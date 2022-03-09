import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserTransactions } from "../requests";
import {  Table  } from "antd";
import "antd/dist/antd.css";
export const UserTransactions = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [currentBalance, setCurrentBalance] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchUserTransactions(id)
      .then((data) => {
        setName(data.name);
        setCurrentBalance(data.balance)
        const transaction = [];
        for (let i = data.transactions.length-1; i >=0; i--) {
          transaction.push({
            oldBalance: data.transactions[i].newBalance - data.transactions[i].transferedFunds,
            transferedFunds: data.transactions[i].transferedFunds,
            newBalance: data.transactions[i].newBalance,
            date: new Date(data.transactions[i].date).toUTCString(),
            dateMS: new Date(data.transactions[i].date).getTime(),
          });
        }
        setData(transaction);
      })
      .finally(() => setLoading(true));
  }, [id]);


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
      sortDirections: ['ascend'],
      sorter: (a, b) =>  a.dateMS -b.dateMS,
    }
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
      <h1>{name+currentBalance}</h1>
      {isLoading ? listItems : <div>Loading ...</div>}
    </div>
  );
};
