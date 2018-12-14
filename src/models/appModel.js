import { message } from "antd";
import { updatePassword, logout, getMenuByUserId } from "../services/login";
import { queryExample } from "../services/example";
import { hashHistory } from "react-router";
export default {
  namespace: "appModel",

  state: {
    loading: false,
    menu: [],
    selectedKeys: ["0"],
    menuSelectedKeys: [],
    openKeys: [],
    defaultOpenKeys: "",
    visibleModal: false
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: "configKeyModal",
          payload: location.pathname
        });
        dispatch({
          type: "getMenuByUserId",
          payload: location.pathname
        });
        //  测试mock
        // dispatch({
        //   type: "example",
        //   payload: {}
        // });
      });
    }
  },

  effects: {
    *updatePassword({ payload }, { call, put }) {
      const data = yield call(updatePassword, payload);
      if (data.msg) {
        message.success("修改成功");
        yield put({ type: "querySuccess", payload: { visibleModal: false } });
      } else message.error("原密码不一致");
    },
    *logout({ payload }, { call, put }) {
      const data = yield call(logout, payload);
      if (data) {
        message.success("注销成功");
      }
    },
    *getMenuByUserId({ payload }, { call, put }) {
      if (localStorage.userID) {
        const data = yield call(getMenuByUserId, {
          userID: localStorage.userID
        });
        function fn(data, p_id) {
          var result = [],
            temp;
          for (var i = 0; i < data.length; i++) {
            if (data[i].p_id == p_id) {
              var obj = data[i];
              temp = fn(data, data[i].menu_id);
              if (temp.length > 0) {
                obj.child = temp;
              }
              result.push(obj);
            }
          }
          return result;
        }
        yield put({ type: "querySuccess", payload: { menu: fn(data, -1) } });
      }
    },
    *queryExample({ payload }, { call, put }) {
      const data = yield call(query, {});
      console.log(111, data);
    }
  },

  reducers: {
    changeKey(state, action) {
      state.selectedKeys = [];
      state.selectedKeys.push(action.payload);
      if (action.payload == "0") {
        hashHistory.push("/home");
      }
      if (action.payload == "1") {
        hashHistory.push("/game");
      }
      if (action.payload == "2") {
        hashHistory.push("/manage");
      }
      if (action.payload == "3") {
        hashHistory.push("/upload");
      }
      if (action.payload == "4") {
        hashHistory.push("/login");
      }
      // hashHistory.push('*');
      return { ...state };
    },
    configKeyModal(state, action) {
      var selected = action.payload.split("/");
      var selectedPathname = selected[selected.length - 1];
      state.menuSelectedKeys = [selectedPathname];
      if (selected.length > 2) {
        state.openKeys = [selected[selected.length - 2]];
      }
      if (action.payload == "/home") {
        state.selectedKeys = [];
        state.selectedKeys.push("0");
      }
      if (action.payload == "/game") {
        state.selectedKeys = [];
        state.selectedKeys.push("1");
      }
      if (action.payload == "/manage") {
        state.selectedKeys = [];
        state.selectedKeys.push("2");
      }
      if (action.payload == "/upload") {
        state.selectedKeys = [];
        state.selectedKeys.push("3");
      }
      if (action.payload == "/login") {
        state.selectedKeys = [];
        state.selectedKeys.push("4");
      }
      return { ...state };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
