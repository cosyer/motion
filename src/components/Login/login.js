import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox, message } from "antd";
import request from "../../utils/request";
import config from "../../utils/config";
import { hashHistory } from "react-router";

const FormItem = Form.Item;
let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    const button = ReactDOM.findDOMNode(this.refs.button);
    const hide = message.loading("正在验证...", 0);
    const params = this.props.form.getFieldsValue();
    button.setAttribute("disabled", "true");
    userLogin();
    console.log(params);
    console.log(
      config.host +
        "/isLogin?userName=" +
        params.userName +
        "&password=" +
        params.password
    );
    const prom = request(
      config.host +
        "/isLogin?userName=" +
        params.userName +
        "&password=" +
        params.password,
      {
        method: "get",
        data: params
      }
    );
    prom.done(function(reply) {
      if (reply.data) {
        hide();
        message.info(`登录成功, 用户名:` + params.userName);
        hashHistory.push("/home");
      } else {
        hide();
        message.error(`登录失败: 请联系管理员`);
        button.removeAttribute("disabled");
      }
    });
  },

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator("userName")(<Input placeholder="用户名" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password")(
            <Input type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("agreement")(<Checkbox>记住密码</Checkbox>)}
        </FormItem>
        <Button ref="button" type="primary" size="large" htmlType="submit">
          <span>登录</span>
        </Button>
      </Form>
    );
  }
});

Demo = Form.create()(Demo);
export default Demo;
