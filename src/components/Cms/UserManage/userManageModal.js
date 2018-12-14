import React, { PropTypes } from "react";
import { Form, Input, Modal, Icon } from "antd";
const FormItem = Form.Item;

const userManageModal = ({
  visible,
  actionType,
  currentItem = {},
  onOk,
  onCancel,
  form: { getFieldDecorator, validateFields, getFieldsValue }
}) => {
  function handleOk() {
    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = { ...getFieldsValue() };
      onOk(data);
    });
  }
  const modalOpts = {
    title: actionType == "add" ? "新建用户" : "编辑用户",
    visible,
    width: 300,
    onOk: handleOk,
    onCancel,
    wrapClassName: "vertical-center-modal"
  };
  return (
    <Modal {...modalOpts}>
      {/*注册*/}
      {actionType == "add" && (
        <Form layout="horizontal">
          <FormItem>
            {getFieldDecorator("re_userName", {
              rules: [{ required: true, message: "用户名未填写" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="请输入用户名"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "邮箱格式不正确"
                },
                {
                  required: true,
                  message: "邮箱未填写"
                }
              ]
            })(
              <Input
                prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                placeholder="请输入邮箱便于重置密码"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("re_password", {
              rules: [{ required: true, message: "密码未填写" }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="请输入密码"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("re_val", {
              rules: [{ required: true, message: "密码未填写" }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="请确认密码"
              />
            )}
          </FormItem>
        </Form>
      )}

      {/*编辑*/}
      {actionType == "edit" && (
        <Form layout="horizontal">
          <FormItem>
            {getFieldDecorator("userName", {
              initialValue: currentItem.user_name,
              rules: [{ required: true, message: "用户名未填写" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="请输入用户名"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("email", {
              initialValue: currentItem.email,
              rules: [
                {
                  type: "email",
                  message: "邮箱格式不正确"
                },
                {
                  required: true,
                  message: "邮箱未填写"
                }
              ]
            })(
              <Input
                prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                placeholder="请输入邮箱便于重置密码"
              />
            )}
          </FormItem>
        </Form>
      )}
    </Modal>
  );
};

userManageModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

export default Form.create()(userManageModal);
