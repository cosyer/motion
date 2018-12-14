import {
  getComment,
  getBook,
  getQuotation,
  getAccount,
  addComment,
  deleteComment,
  searchComment,
  editComment
} from "../services/manage";

import { message } from "antd";
export default {
  namespace: "manage",

  state: {
    loading: false,
    commentData: [],
    markValue: 0,
    bookData: [],
    quotation: [],
    accountData: [],
    type: "comment",
    selectedRowKeys: [],
    selectedRowValue: [],
    commentVisible: false,
    commentModalType: "",
    tabsValue: "1"
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/manage") {
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
      const commentData = yield call(getComment, payload);
      const bookData = yield call(getBook, payload);
      const quotationData = yield call(getQuotation, payload);
      const accountData = yield call(getAccount, payload);
      yield put({
        type: "querySuccess",
        payload: {
          commentData: commentData,
          bookData: bookData,
          quotationData: quotationData,
          accountData: accountData,
          tabsValue: "1"
        }
      });
    },
    *addComment({ payload }, { call, put }) {
      yield put({ type: "hideCommentModal" });
      const data = yield call(addComment, payload);
      if (data) {
        message.success("添加成功");
        yield put({ type: "query" });
      }
    },
    *deleteComment({ payload }, { select, call, put }) {
      // yield put({type:'showLoading'})
      const id = yield select(({ manage }) => manage.selectedRowKeys);
      var ids = "";
      for (var i = 0; i < id.length; i++) {
        ids += id[i];
        if (i < id.length - 1) {
          ids += ",";
        }
      }
      const newUser = { ids };
      const data = yield call(deleteComment, newUser);
      if (data) {
        message.success("删除成功");
        yield put({ type: "query" });
      }
    },
    *searchComment({ payload }, { call, put }) {
      yield put({ type: "showLoading" });
      const data = yield call(searchComment, payload);
      if (data) {
        yield put({
          type: "querySuccess",
          payload: {
            commentData: data
          }
        });
      }
    },
    *editComment({ payload }, { select, call, put }) {
      const comment_id = yield select(
        ({ manage }) => manage.selectedRowKeys[0]
      );
      const newUser = { ...payload, comment_id };
      const data = yield call(editComment, newUser);
      yield put({ type: "hideCommentModal" });
      if (data) {
        message.success("修改成功");
        yield put({ type: "query" });
      }
    }
  },

  reducers: {
    onChange(state, action) {
      state.value = action.payload;
      state.value.toString("html");
      return { ...state };
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    selectchange(state, action) {
      state.selectedRowKeys = action.payload.key;
      state.selectedRowValue = action.payload.value;
      if (action.payload.value.length > 0) {
        state.markValue = action.payload.value[0].mark;
      }
      return { ...state, ...action.payload };
    },
    showCommentModal(state, action) {
      state.commentVisible = true;
      return { ...state, ...action.payload };
    },
    hideCommentModal(state) {
      state.commentVisible = false;
      state.selectedRowKeys = [];
      return { ...state };
    }
  }
};
