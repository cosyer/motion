import React from "react";
import { connect } from "dva";
import { Input, Row, Col, Checkbox, Button, Select, Form } from "antd";
const { TextArea } = Input;
const Option = Select.Option;
const dataList = [
  { key: "匹配中文字符", value: "[\\u4e00-\\u9fa5]" },
  { key: "匹配双字节字符(包括汉字在内)", value: "[^\\x00-\\xff]" },
  { key: "匹配空白行", value: "\\n\\s*\\r" },
  // {key:'匹配Email地址',value:'[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?'},
  { key: "匹配网址", value: "[a-zA-z]+://[^\\s]*" },
  { key: "匹配国内电话号码", value: "\\d{3}-\\d{8}|\\d{4}-\\{7,8}" },
  { key: "匹配腾讯QQ号", value: "[1-9][0-9]{4,}" },
  { key: "匹配中国邮政编码", value: "[1-9]\\d{5}(?!\\d)" },
  {
    key: "匹配18位身份证证号",
    value: "^(\\d{6})(\\d{4})(\\d{2})(\\d{2})(\\d{3})([0-9]|X)$"
  },
  {
    key: "匹配(年-月-日)格式日期",
    value:
      "([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))"
  },
  { key: "匹配正整数", value: "^[1-9]\\d*$" },
  { key: "匹配负整数", value: "^-[1-9]\\d*$" },
  { key: "匹配非负整数", value: "^[1-9]d*|0$" },
  { key: "匹配非正整数", value: "^-[1-9]\\d*|0$" },
  { key: "匹配正浮点数", value: "^[1-9]d*.d*|0.d*[1-9]d*$" },
  { key: "匹配负浮点数", value: "^-[1-9]d*.d*|-0.d*[1-9]d*$" }
];
const list = dataList.map((item, index) => {
  return <Option value={item.value}>{item.key}</Option>;
});
class Regexp extends React.Component {
  constructor(props) {
    super(props);
    console.log("props", this.props);
    this.state = {
      regExp: "",
      textValue: "",
      result: ""
    };
  }

  // 这样才能修改state
  handleChange = value => {
    this.setState({ regExp: value });
  };

  // 测试匹配
  startTest = () => {
    var reg = new RegExp(this.state.regExp, "g");
    console.log("1====>", this.state.regExp);
    console.log("2====>", this.state.textValue);
    console.log(reg.exec(this.state.textValue));
    console.log(this.state.textValue.match(reg));
    this.setState({
      result:
        this.state.textValue.match(reg) == null
          ? "无匹配结果"
          : this.state.textValue.match(reg)
    });
  };

  // 文本变化
  handleText = e => {
    this.setState({ textValue: e.target.value });
  };

  render() {
    return (
      <div>
        <Form>
          <span>在线正则表达式测试</span>
          <Row>
            <Col span={12}>
              <TextArea
                rows={4}
                placeholder="在此输入待匹配文本"
                onChange={this.handleText}
              />
            </Col>
            <Col span={12}>
              <Select
                style={{ width: 300, marginLeft: 20 }}
                showSearch
                allowClear
                onChange={this.handleChange}
                placeholder="常用的正则表达式"
              >
                {list}
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col span={12}>
              <Input
                addonBefore="正则表达式"
                placeholder="在此输入正则表达式"
                value={this.state.regExp}
              />
              <Button
                type="primary"
                icon="search"
                style={{ marginLeft: 10 }}
                onClick={this.startTest}
              >
                测试匹配
              </Button>
              <div style={{ marginTop: 5 }}>
                <Checkbox onChange={this.props.onChange}>全局搜索</Checkbox>
                <Checkbox onChange={this.props.onChange}>忽略大小写</Checkbox>
              </div>
            </Col>
          </Row>
          <span style={{ marginTop: 20 }}>匹配结果：</span>
          <Row>
            <Col span={12}>
              <TextArea rows={8} value={this.state.result} />
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default connect(({ picture }) => ({ picture }))(Regexp);
