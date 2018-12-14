import { isLogin, register, judgeUser, sendMail } from "../services/login";
import { message } from "antd";
import { hashHistory } from "react-router";

export default {
  namespace: "login",
  state: {
    loading: false,
    controller: true
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/login") {
          dispatch({
            type: "querySuccess",
            payload: { controller: true }
          });
        }
      });
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      // localStorage.clear();
      // localStorage.setItem('userName', payload.userName);
      yield put({ type: "showLoading" });
      var json = {};
      json["ip"] = returnCitySN["cip"];
      json["cityName"] = returnCitySN["cname"];
      const newParam = { ...json, ...payload };
      const loginstate = yield call(isLogin, newParam);
      var obj = {};
      obj["userName"] = payload.userName;
      if (loginstate.msg && obj.userName) {
        localStorage.userID = loginstate.userId;
        localStorage.username = payload.userName;
        yield put({ type: "hideLoading" });
        message.success("登录成功!");
        hashHistory.push("/manage");
      } else {
        yield put({ type: "hideLoading" });
        message.error("登录失败,用户名或密码错误!");
      }
    },
    *register({ payload }, { call, put }) {
      const result = yield call(judgeUser, payload);
      if (result.msg) {
        message.error("用户名重复,请修改");
        return false;
      }
      const data = yield call(register, payload);
      if (data) {
        message.success("注册成功!");
      }
      yield put({ type: "querySuccess", payload: { controller: true } });
    },
    *forgetPwd({ payload }, { call, put }) {
      const data = yield call(sendMail, payload);
      if (data.msg) {
        message.success("邮件发送成功！");
      } else {
        message.error("无此用户名");
      }
    }
  },

  reducers: {
    showLoading(state) {
      state.loading = true;
      return { ...state };
    },
    hideLoading(state, action) {
      state.loading = false;
      return { ...state };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
