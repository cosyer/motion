import React, { PropTypes } from "react";
import { Form, Input, Select, Modal } from "antd";
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const roleManageUpdateModal = ({
  visible,
  roleList = [],
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
      const data = { ...getFieldsValue(), role_id: item.role_id };
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

  function checkUpdateRole(rule, value, callback) {
    if (!value) {
      callback(new Error("职位名称未填写"));
    }
    if (!/^[u4e00-u9fa5]{3,6}$/.test(value)) {
      callback(new Error("职位名称不合法"));
    } else {
      callback();
    }
  }
  const loop = roleList =>
    roleList.map(item => {
      // console.log(item)
      return (
        <Select.Option value={item.code} key={item.code}>
          {item.role_name}
        </Select.Option>
      );
    });
  const roleSelect = loop(roleList);
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <Form.Item label="角色名" {...formItemLayout}>
          {getFieldDecorator("role_name", {
            initialValue: item.role_name,
            rules: [{ required: true, message: "角色名不能为空！" }]
          })(<Input placeholder="请输入角色名" />)}
        </Form.Item>
        <FormItem label="描述" {...formItemLayout}>
          {getFieldDecorator("remark", {
            initialValue: item.remark
          })(<Input type="textarea" placeholder="请简短描述角色功能" />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

roleManageUpdateModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

export default Form.create()(roleManageUpdateModal);
