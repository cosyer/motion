import React from "react";
import { Form, Input, Modal, Icon } from "antd";
const FormItem = Form.Item;

const menuManageModal = ({
  visible,
  modalType,
  currentItem = {},
  onOk,
  onCancel,
  form: { getFieldDecorator, validateFields, getFieldsValue, resetFields }
}) => {
  function handleCancel() {
    resetFields();
    onCancel();
  }
  function handleOk() {
    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = { ...getFieldsValue() };
      resetFields();
      onOk(data);
    });
  }
  const modalOpts = {
    title: modalType == "add" ? "新增菜单" : "编辑菜单",
    visible,
    width: 300,
    onOk: handleOk,
    onCancel: handleCancel,
    wrapClassName: "vertical-center-modal"
  };
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        {modalType == "add" && (
          <FormItem>
            <Input
              prefix={<Icon type="bars" style={{ fontSize: 13 }} />}
              value={currentItem.menu_name}
              disabled
            />
          </FormItem>
        )}
        <FormItem>
          {getFieldDecorator("menu_name", {
            initialValue: modalType == "add" ? "" : currentItem.menu_name,
            rules: [{ required: true, message: "菜单名未填写" }]
          })(
            <Input
              prefix={<Icon type="menu-fold" style={{ fontSize: 13 }} />}
              placeholder="请输入菜单名"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("code", {
            initialValue: modalType == "add" ? "" : currentItem.code,
            rules: [
              {
                required: true,
                message: "编号未填写"
              }
            ]
          })(
            <Input
              prefix={<Icon type="code" style={{ fontSize: 13 }} />}
              placeholder="请输入编号"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("src", {
            initialValue: currentItem.src,
            rules: [
              {
                required: true,
                message: "路径未填写"
              }
            ]
          })(
            <Input
              prefix={<Icon type="link" style={{ fontSize: 13 }} />}
              placeholder="请输入菜单路径"
            />
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Form.create()(menuManageModal);
