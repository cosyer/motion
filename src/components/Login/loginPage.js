import React, { PropTypes } from "react";
import { Form, Input, Spin, Icon, Button, Checkbox, message } from "antd";

const FormItem = Form.Item;

const LoginForm = ({
  loading,
  controller,
  form: { getFieldDecorator, validateFields, getFieldsValue, getFieldValue },
  onChange,
  onLogin,
  onRegister,
  forgetPwd
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields(errors => {
      if (!!errors) {
        return;
      }
      onLogin(getFieldsValue());
    });
  }
  function handleRegister(e) {
    e.preventDefault();
    var data = getFieldsValue();
    if (data.re_password != data.re_val) {
      message.error("密码不一致");
      return false;
    }
    validateFields(errors => {
      if (!!errors) {
        return;
      }
      onRegister(data);
    });
  }
  return (
    <div>
      {/*登录*/}
      {controller && (
        <Form onSubmit={handleSubmit}>
          <FormItem horizontal>
            {getFieldDecorator("userName", {
              rules: [{ required: true, message: "用户名未填写" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="请输入用户名"
              />
            )}
          </FormItem>
          <FormItem horizontal>
            {getFieldDecorator("password", {
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
            <span
              style={{ cursor: "pointer" }}
              onClick={() => forgetPwd(getFieldValue("userName"))}
            >
              忘记密码?
            </span>
            <span
              style={{ float: "right", cursor: "pointer" }}
              onClick={onChange}
            >
              没有帐号?欢迎注册>>
            </span>
            <Button type="primary" size="large" htmlType="submit">
              <span>登录</span>
            </Button>
          </FormItem>
        </Form>
      )}

      {/*注册*/}
      {!controller && (
        <Form onSubmit={handleRegister}>
          <FormItem horizontal>
            {getFieldDecorator("re_userName", {
              rules: [{ required: true, message: "用户名未填写" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="请输入用户名"
              />
            )}
          </FormItem>
          <FormItem horizontal>
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
          <FormItem horizontal>
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
          <FormItem horizontal>
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
          <FormItem>
            <Button type="primary" size="large" htmlType="submit">
              <span>注册</span>
            </Button>
          </FormItem>
        </Form>
      )}
    </div>
  );
};

LoginForm.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onLogin: PropTypes.func
};

export default Form.create()(LoginForm);
