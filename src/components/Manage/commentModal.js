import React, { PropTypes } from "react";
import { Form, Select, Input, Modal, Rate } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const commentModal = ({
  visible,
  item = {},
  title,
  markValue,
  onOk,
  onCancel,
  changeMark,
  form: { getFieldDecorator, validateFields, getFieldsValue, resetFields }
}) => {
  function handleOk() {
    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = { ...getFieldsValue() };
      onOk(data);
      resetFields();
    });
  }

  const modalOpts = {
    title: title,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: "vertical-center-modal"
  };

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="作品名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator("name", {
            initialValue: item.name,
            rules: [{ required: true, message: "未填写" }]
          })(<Input />)}
        </FormItem>
        <FormItem label="类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator("type", {
            initialValue: item.type,
            rules: [{ required: true, message: "未填写" }]
          })(<Input />)}
        </FormItem>
        <FormItem label="简介" hasFeedback {...formItemLayout}>
          {getFieldDecorator("descripation", {
            initialValue: item.descripation,
            rules: [{ required: true, message: "不能为空" }]
          })(<Input type="textarea" autosize />)}
        </FormItem>
        <FormItem label="评分" hasFeedback {...formItemLayout}>
          {getFieldDecorator("mark", {
            initialValue: item.mark,
            rules: [{ required: true, message: "不能为空" }]
          })(<Input />)}
        </FormItem>
        <FormItem label="评论" hasFeedback {...formItemLayout}>
          {getFieldDecorator("comment", {
            initialValue: item.comment,
            rules: [{ required: true, message: "不能为空" }]
          })(<Input type="textarea" autosize />)}
        </FormItem>
        <FormItem label="评分" hasFeedback {...formItemLayout}>
          <Rate value={parseInt(markValue)} allowHalf onChange={changeMark} />
          {markValue && (
            <span className="ant-rate-text">{markValue} stars</span>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

commentModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

export default Form.create()(commentModal);
