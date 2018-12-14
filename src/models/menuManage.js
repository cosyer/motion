import {
  queryMenuList,
  updateMenuState,
  deleteMenu,
  updateMenu,
  addMenu
} from "../services/menuManage";
export default {
  namespace: "menuManage",

  state: {
    loading: false,
    menuListData: [],
    modalVisible: false,
    modalType: "",
    currentItem: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/user/menuManage") {
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
      const data = yield call(queryMenuList, payload);
      if (data) {
        yield put({ type: "hideLoading" });
        yield put({ type: "querySuccess", payload: { menuListData: data } });
      }
    },
    *changeState({ payload }, { call, put }) {
      yield put({ type: "showLoading" });
      const data = yield call(updateMenuState, payload);
      if (data) {
        yield put({ type: "query" });
      }
    },
    *deleteMenu({ payload }, { call, put }) {
      yield put({ type: "showLoading" });
      const data = yield call(deleteMenu, payload);
      if (data) {
        yield put({ type: "query" });
      }
    },
    *updateMenu({ payload }, { call, put }) {
      yield put({ type: "showLoading", payload: { modalVisible: false } });
      const data = yield call(updateMenu, payload);
      if (data) {
        yield put({ type: "query" });
      }
    },
    *addMenu({ payload }, { call, put }) {
      yield put({ type: "showLoading", payload: { modalVisible: false } });
      const data = yield call(addMenu, payload);
      if (data) {
        yield put({ type: "query" });
      }
    }
  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
    showLoading(state, action) {
      state.loading = true;
      return { ...state, ...action.payload };
    },
    hideLoading(state) {
      state.loading = false;
      return { ...state };
    }
  }
};
