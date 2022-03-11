export const fetchClients = async () => {
  const data = await fetch("/getUsers", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return data;
};

export const makeATransaction = async (id, funds) => {
  const data = await fetch("/makeATransaction", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: id, balance: funds }),
  }).then((res) => res.json());
  return data;
};

export const fetchTransactions = async () => {
  const data = await fetch("/getTransactionList", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return data;
};

export const fetchUserTransactions = async (id) => {
  const data = await fetch("/getTransactionUserList/" + id, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return data;
};

export const addAUser = async (values) => {
  const data = await fetch("/addAUser", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((res) => res.json());
  return data;
};
