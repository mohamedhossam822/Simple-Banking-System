import React, { useState } from "react";
import { addAUser } from "../requests";
import "antd/dist/antd.css";
import { Breadcrumb, Button, Space, Form, Input } from "antd";
import "../Styles/components.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

///////// Pop-up Messsages Config /////////
toast.configure();

export const Home = ({ handleClick }) => {
  const [switchButtonForm, setSwitchButtonForm] = React.useState(true);
  const defaultErrMessage = {
    name: {
      validateStatus: "success",
      errorMsg: null,
    },
    email: {
      validateStatus: "success",
      errorMsg: null,
    },
    balance: {
      validateStatus: "success",
      errorMsg: null,
    },
  };
  const [errMessage, setErrMessage] = useState(defaultErrMessage);
  const [form] = Form.useForm();

  const showForm = () => {
    setSwitchButtonForm(false);
  };

  const hideForm = () => {
    setErrMessage(defaultErrMessage);
    form.resetFields();
    setSwitchButtonForm(true);
  };

  const submitForm = async (values) => {
    if (validateForm(values)) {
      setErrMessage(defaultErrMessage);
      const res = await addAUser(values);
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
        toast.info("Couldn't Create User", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      hideForm();
    }
  };

  const validateForm = (values) => {
    if (!/^[a-zA-Z]/.test(values.name)) {
      setErrMessage({
        ...defaultErrMessage,
        name: {
          validateStatus: "error",
          errorMsg: "Pleas enter a valid client name",
        },
      });
      return false;
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        values.email
      )
    ) {
      setErrMessage({
        ...defaultErrMessage,
        email: {
          validateStatus: "error",
          errorMsg: "Pleas enter a valid email",
        },
      });
      return false;
    }
    if (isNaN(values.balance) || values.balance === "") {
      setErrMessage({
        ...defaultErrMessage,
        balance: {
          validateStatus: "error",
          errorMsg: "Please Enter a valid number",
        },
      });
      return false;
    }
    //Validate its bigger than 0
    if (values.balance < 0) {
      setErrMessage({
        ...defaultErrMessage,
        balance: {
          validateStatus: "error",
          errorMsg: "Please Enter a number 0 or any postive number",
        },
      });
      return false;
    }
    return true;
  };

  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <div className="screenCenter">
        <h1>
          Welcome to oue simple banking website where you can view <br></br>our
          clients & their latest transactions !
        </h1>
        <br></br>
        <Space size="middle">
          <Button
            onClick={() => {
              handleClick({ key: "clients", external: true });
            }}
            style={{ marginLeft: "33px" }}
            size="large"
          >
            Check Our Clients!
          </Button>
          <Button
            onClick={() => {
              handleClick({ key: "transactions", external: true });
            }}
            size="large"
          >
            See Our Latest Transactions!
          </Button>
        </Space>
        <h1> </h1>
        {switchButtonForm ? (
          <Button
            onClick={showForm}
            style={{ marginRight: "27px" }}
            size="large"
          >
            Add a new client!
          </Button>
        ) : (
          <div className="formStyling">
            <br></br> <br></br>
            <Form
              form={form}
              initialValues={{ balance: 0 }}
              layout="vertical"
              onFinish={submitForm}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: "Please input the client name!" },
                ]}
                validateStatus={errMessage.name.validateStatus}
                help={errMessage.name.errorMsg}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input the client email!" },
                ]}
                validateStatus={errMessage.email.validateStatus}
                help={errMessage.email.errorMsg}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="balance"
                label="Balance"
                validateStatus={errMessage.balance.validateStatus}
                help={errMessage.balance.errorMsg}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Space size="middle">
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button htmlType="button" onClick={hideForm}>
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};
