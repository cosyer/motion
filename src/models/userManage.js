import {
  getUserList,
  searchByKey,
  updateUser,
  deleteUser,
  getUserRole,
  addUserRole
} from "../services/userManage";
import { message } from "antd";
export default {
  namespace: "userManage",

  state: {
    userId: "",
    roleList: [],
    userList: [],
    checkedList: [],
    userRoleVisible: false,
    loading: false,
    visible: false,
    actionType: "",
    selectedRowKeys: [],
    item: [],
    theme: "dark"
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/user/userManage") {
          dispatch({
            type: "query",
            payload: location.pathname
          });
        }
      });
    }
  },

  effects: {
    *query({ payload }, { call, put }) {
      yield put({ type: "showLoading" });
      const data = yield call(getUserList, payload);
      if (data) {
        yield put({ type: "hideLoading" });
        yield put({ type: "querySuccess", payload: { userList: data } });
      }
    },
    *searchByKey({ payload }, { call, put }) {
      yield put({ type: "showLoading" });
      const data = yield call(searchByKey, payload);
      if (data) {
        yield put({ type: "hideLoading" });
        yield put({ type: "querySuccess", payload: { userList: data } });
      }
    },
    *updateUser({ payload }, { call, put }) {
      const data = yield call(updateUser, payload);
      if (data) {
        message.success("修改成功");
        yield put({ type: "query" });
      }
    },
    *deleteUser({ payload }, { call, put }) {
      const data = yield call(deleteUser, payload);
      if (data) {
        message.success("删除成功");
        yield put({ type: "query" });
      }
    },
    *userRole({ payload }, { call, put }) {
      const data = yield call(getUserRole, payload);
      if (data) {
        var roleList = [];
        var checkedList = [];
        for (var i = 0; i < data.length; i++) {
          var json = {};
          json["label"] = data[i].role_name;
          json["value"] = data[i].role_id;
          roleList.push(json);
          if (data[i].checked == 1) {
            checkedList.push(data[i].role_id);
          }
        }
        yield put({
          type: "querySuccess",
          payload: {
            roleList: roleList,
            checkedList: checkedList,
            userRoleVisible: true
          }
        });
      }
    },
    *addUserRole({ payload }, { call, put }) {
      const data = yield call(addUserRole, payload);
      if (data) {
        message.success("角色分配成功");
        yield put({
          type: "querySuccess",
          payload: { userRoleVisible: false }
        });
      }
    }
  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
    showLoading(state, action) {
      state.loading = true;
      return { ...state };
    },
    hideLoading(state, action) {
      state.loading = false;
      return { ...state };
    }
  }
};
