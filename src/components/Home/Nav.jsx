import React, { PropTypes } from "react";
import TweenOne from "rc-tween-one";
import { hashHistory } from "react-router";
import Menu from "antd/lib/menu";
import { Icon, Modal, Form, Input } from "antd";
import styles from "./Nav.less";
import logo from "../../image/logo.png";
import user from "../../image/user.jpg";
const Item = Menu.Item;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
class Header extends React.Component {
  handleUpdate = e => {
    e.preventDefault();
    this.props.form.validateFields(errors => {
      if (!!errors) {
        return;
      }
      this.props.onUpdate(this.props.form.getFieldsValue());
      this.props.form.resetFields();
    });
  };
  handleHideModal = () => {
    this.props.form.resetFields();
    this.props.handleCancel();
  };
  // showModal setState
  render() {
    const {
      getFieldDecorator,
      validateFields,
      getFieldsValue
    } = this.props.form;
    const navData = {
      menu1: "首页",
      menu2: "项目",
      menu3: "管理",
      menu4: "文件上传"
    };
    if (!localStorage.userID) {
      navData["menu5"] = "登录";
    }
    const navChildren = Object.keys(navData).map((key, i) => (
      <Item key={i}>{navData[key]}</Item>
    ));
    const userTitle = (
      <div>
        <span className="img">
          <img src={user} width="30" height="30" className={styles.userImage} />
        </span>
        <span>{localStorage.username}</span>
      </div>
    );
    localStorage.userID &&
      navChildren.push(
        <SubMenu className="user" title={userTitle} key="user">
          <Item key="a" className={styles.subMenuText}>
            <span onClick={() => hashHistory.push("/cms")}>用户中心</span>
          </Item>
          <Item key="b" className={styles.subMenuText}>
            <span onClick={this.props.showModal}>修改密码</span>
          </Item>
          <Item key="c" className={styles.subMenuText}>
            <span onClick={this.props.signOut}>注销</span>
          </Item>
        </SubMenu>
      );
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: "from" }}
        style={{ position: "fixed" }}
        {...this.props}
      >
        <TweenOne
          className={`${this.props.className}-logo`}
          animation={{ x: -30, type: "from", ease: "easeOutQuad" }}
        >
          <img
            id="logo"
            src={logo}
            onClick={() => hashHistory.push("/home")}
            style={{ cursor: "pointer" }}
          />
        </TweenOne>
        <TweenOne
          className={`${this.props.className}-nav`}
          animation={{ x: 30, type: "from", ease: "easeOutQuad" }}
        >
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["0"]}
            onSelect={this.props.onSelect}
            selectedKeys={this.props.selectedKeys}
          >
            {navChildren}
          </Menu>
          <Modal
            title="修改密码"
            width="300px"
            visible={this.props.visibleModal}
            onOk={this.handleUpdate}
            onCancel={this.handleHideModal}
          >
            <Form>
              <FormItem horizontal>
                {getFieldDecorator("origin_password", {
                  rules: [{ required: true, message: "原密码未填写" }]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                    type="password"
                    placeholder="请输入原密码"
                  />
                )}
              </FormItem>
              <FormItem horizontal>
                {getFieldDecorator("new_password", {
                  rules: [{ required: true, message: "新密码未填写" }]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                    type="password"
                    placeholder="请输入新密码"
                  />
                )}
              </FormItem>
            </Form>
          </Modal>
        </TweenOne>
      </TweenOne>
    );
  }
}

Header.propTypes = {
  className: PropTypes.string,
  onSelect: PropTypes.func,
  selectedKeys: PropTypes.array
};

Header.defaultProps = {
  className: "header0"
};

export default Form.create()(Header);
