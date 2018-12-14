import React, { PropTypes } from "react";
import { connect } from "dva";
import { Form, Button, Radio, Checkbox, message } from "antd";
import styles from "./Login.less";
import photo from "../image/photo.png";
import bg from "../image/bg.jpg";
import LoginPage from "../components/Login/loginPage";

function Login({ location, dispatch, login }) {
  const { loading, controller } = login;
  const loginProps = {
    loading: loading,
    controller: controller,
    onLogin(value) {
      dispatch({
        type: "login/login",
        payload: value
      });
    },
    onRegister(value) {
      dispatch({
        type: "login/register",
        payload: {
          userName: value.re_userName,
          password: value.re_password,
          email: value.email
        }
      });
    },
    onChange() {
      dispatch({
        type: "login/querySuccess",
        payload: { controller: false }
      });
    },
    forgetPwd(value) {
      if (value) {
        dispatch({
          type: "login/forgetPwd",
          payload: { userName: value }
        });
      } else {
        message.error("请输入用户名");
      }
    }
  };
  return (
    <div>
      <img src={bg} width="100%" height="620px" />
      <div className={styles.signIn}>
        <div className={styles.logo + " " + styles.mb}>
          <img src={photo} />
          <span>Admin</span>
        </div>
        <LoginPage {...loginProps} />
      </div>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps({ login }) {
  return { login };
}
export default connect(mapStateToProps)(Login);
//export default connect(({loginPage}) => ({loginPage}))(LoginPage);
