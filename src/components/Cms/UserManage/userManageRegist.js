import React, { PropTypes } from "react";
import { Form, Input, Modal } from "antd";
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const userManageRegist = ({
  visible,
  item = {},
  onOk,
  onCancel,
  title,
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
    title: title,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: "vertical-center-modal"
  };
  function checkUserCount(rule, value, callback) {
    if (!value) {
      callback(new Error("用户名未填写"));
    }
    if (!/^[a-zA-z][a-zA-Z0-9_]{2,9}$/.test(value)) {
      callback(new Error("用户名不合法"));
    } else {
      callback();
    }
  }
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="帐号:" hasFeedback {...formItemLayout}>
          {getFieldDecorator("user_name", {
            initialValue: item.user_name,
            rules: [{ required: true, validator: checkUserCount }]
          })(<Input placeholder="请输入便于记忆的帐号" />)}
        </FormItem>
        <FormItem label="昵称:" hasFeedback {...formItemLayout}>
          {getFieldDecorator("nick_name", {
            initialValue: item.nick_name,
            rules: [{ required: true, message: "您的昵称没有填写" }]
          })(<Input />)}
        </FormItem>
        <FormItem label="密码:" hasFeedback {...formItemLayout}>
          {getFieldDecorator("password", {
            initialValue: item.password,
            rules: [{ required: true, message: "用户名没有填写" }]
          })(<Input type="password" />)}
        </FormItem>
        <FormItem label="描述:" hasFeedback {...formItemLayout}>
          {getFieldDecorator("description", {
            initialValue: item.description
          })(<Input type="textarea" placeholder="描述您此刻的心情吧" />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

userManageRegist.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

export default Form.create()(userManageRegist);
