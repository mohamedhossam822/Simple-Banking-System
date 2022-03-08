export const fetchData = async () => {
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
  const data= await fetch("/makeATransaction", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: id, balance: funds }),
  }).then((res) => res.json());
  return data;
};
