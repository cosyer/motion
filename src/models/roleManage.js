import {
  getRoleList,
  queryMenu,
  getMenuByRoleId,
  updateRole,
  addMenuToRole,
  add,
  searchByKeyword,
  deleteRole
} from "../services/roleManage";
import { message } from "antd";

export default {
  namespace: "roleManage",

  state: {
    roleList: [],
    loading: false,
    currentItem: {},
    selectedRowKeys: [],
    checkedKeys: [],
    treeList: [],
    modalVisible: false,
    modelMenuVisible: false,
    modalType: ""
  },

  //类似监听
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/user/roleManage") {
          dispatch({
            type: "query",
            payload: location.query
          });
        }
      });
    }
  },
  effects: {
    *query({ payload }, { call, put }) {
      yield put({ type: "showLoading" });
      const data = yield call(getRoleList, payload);
      if (data) {
        yield put({
          type: "querySuccess",
          payload: {
            roleList: data
          }
        });
      }
    },
    // 查询树菜单
    *queryMenu({ payload }, { select, call, put }) {
      const data = yield call(getMenuByRoleId, { roleId: payload.roleId });
      var checkedKeys = [];
      var menu = [];
      for (var i in data) {
        if (data[i].checked == 1) {
          menu.push(data[i]);
        }
      }
      for (var j = 0; j < menu.length; j++) {
        for (var k = 0; k < menu.length; k++) {
          if (menu[j].menu_id == menu[k].p_id && menu[k].is_leaf == 1) {
            checkedKeys.push(menu[k].menu_id);
          }
        }
      }
      console.log("----->", checkedKeys);
      if (data) {
        yield put({
          type: "showMenuModal",
          payload: {
            treeList: data,
            checkedKeys: checkedKeys
          }
        });
      }
    },

    *search({ payload }, { call, put }) {
      yield put({ type: "showLoading" });
      const data = yield call(searchByKeyword, payload);
      if (data) {
        yield put({
          type: "querySuccess",
          payload: {
            roleList: data
          }
        });
      }
    },

    *add({ payload }, { call, put }) {
      yield put({ type: "hideModal" });
      yield put({ type: "showLoading" });
      const data = yield call(add, payload);
      if (data) {
        message.success("增加成功");
        yield put({
          type: "query"
        });
      }
    },

    *update({ payload }, { select, call, put }) {
      yield put({ type: "hideModal" });
      yield put({ type: "showLoading" });
      const data = yield call(updateRole, payload);
      if (data) {
        message.success("修改成功");
        yield put({
          type: "query"
        });
      }
    },

    *updateRoleMenuRelation({ payload }, { select, call, put }) {
      const roleManage = yield select(({ roleManage }) => roleManage);
      // 角色id
      payload.roleId = roleManage.selectedRowKeys[0];
      // 获取选择的菜单id
      payload.menuKeys = roleManage.checkedKeys;
      function pushParentMenu(treeList, menuKeys) {
        for (var j = 0; j < menuKeys.length; j++) {
          for (var i = 0; i < treeList.length; i++) {
            if (menuKeys[j] == treeList[i].menu_id && treeList[i].p_id) {
              menuKeys.push(treeList[i].p_id);
            }
          }
        }
        var temp = {};
        for (var i = 0; i < menuKeys.length; i++) {
          temp[menuKeys[i]] = 0;
        }
        menuKeys = [];
        for (var key in temp) {
          menuKeys.push(key);
        }
        return menuKeys;
      }
      payload.menuKeys = pushParentMenu(roleManage.treeList, payload.menuKeys);
      payload.menuKeysStr = payload.menuKeys.join(",");
      const data = yield call(addMenuToRole, payload);
      if (data) {
        message.success("菜单分配成功!");
      } else {
        message.error("菜单分配失败!");
      }
      yield put({ type: "clearSelectedRowKeys" });
      yield put({ type: "hideModal" });
    },

    *deleteRole({ payload }, { call, put }) {
      yield put({ type: "showLoading" });
      const data = yield call(deleteRole, payload);
      if (data) {
        message.success("删除成功");
        yield put({
          type: "query"
        });
      } else {
        message.error("删除失败");
        yield put({
          type: "query"
        });
      }
    }
  },

  reducers: {
    showLoading(state, action) {
      return { loading: true };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true };
    },
    showMenuModal(state, action) {
      return { ...state, ...action.payload, modalMenuVisible: true };
    },
    hideModal(state, action) {
      return {
        ...state,
        ...action.payload,
        modalVisible: false,
        modalMenuVisible: false
      };
    },
    clearSelectedRowKeys(state) {
      state.selectedRowKeys = [];
      return { ...state };
    },
    onSelectChange(state, action) {
      state.selectedRowKeys = action.payload;
      return { ...state };
    },
    onSelectMenuChange(state, action) {
      state.checkedKeys = action.payload;
      return { ...state };
    }
  }
};
