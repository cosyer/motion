import React from "react";
import QRCode from "qrcode.react";
import { Icon, Button, Form, Row, Col, Input, InputNumber, Select } from "antd";
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 }
};
const textLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 }
};
const levelLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
};
function qrcode({
  size,
  value,
  level,
  bgColor,
  fgColor,
  onReload,
  changeSize,
  changeBgColor,
  changeFgColor,
  changeLevel,
  changeValue
}) {
  return (
    <div>
      <Form>
        <Row>
          <Col span={4}>
            <FormItem {...formItemLayout} label="Size宽高(px)">
              <InputNumber onChange={changeSize} defaultValue={128} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="Background Color">
              <Input type="color" onChange={changeBgColor} value={bgColor} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="Foreground Color">
              <Input type="color" onChange={changeFgColor} value={fgColor} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...levelLayout} label="Level">
              <Select value={level} onChange={changeLevel}>
                <Option value="L">L</Option>
                <Option value="M">M</Option>
                <Option value="Q">Q</Option>
                <Option value="H">H</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={2} />
        </Row>
        <Row>
          <Col span={16}>
            <FormItem {...textLayout} label="Value">
              <Input type="textarea" onChange={changeValue} value={value} />
            </FormItem>
          </Col>
          <Col span={8}>
            <Button
              type="primary"
              shape="circle"
              style={{ marginLeft: 20 }}
              onClick={onReload}
            >
              <Icon type="reload" />
            </Button>
          </Col>
        </Row>
      </Form>
      <QRCode
        value={value}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level={level}
      />
    </div>
  );
}
export default Form.create()(qrcode);
