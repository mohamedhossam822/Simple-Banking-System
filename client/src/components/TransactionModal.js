import React from "react";
import { Modal, Form, Input } from "antd";

export const TransactionModal = ({
  isModalVisible,
  errMessage,
  setErrMessage,
  handleOk,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const defaultErrMessage = { validateStatus: "success", errorMsg: null };

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
  return (
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
};
