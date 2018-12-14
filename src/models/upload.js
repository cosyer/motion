import {
  getFileList,
  deleteFile,
  saveComment,
  getComment
} from "../services/upload";
import { message } from "antd";
import RichTextEditor from "react-rte";
export default {
  namespace: "upload",

  state: {
    value: RichTextEditor.createEmptyValue(),
    fileList: [],
    commentData: [],
    previewVisible: false,
    commentVisible: false,
    commentLoading: false,
    previewImage: ""
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/upload") {
          dispatch({
            type: "query",
            payload: location.pathname
          });
        }
        if (location.pathname === "/download") {
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
      yield put({ type: "querySuccess", payload: { commentLoading: true } });
      message.info("文件加载中");
      const data = yield call(getFileList);
      message.destroy();
      if (data.length > 0) {
        yield put({ type: "querySuccess", payload: { fileList: data } });
      } else message.info("没有文件数据");
    },
    *deleteFile({ payload }, { call, put }) {
      const data = yield call(deleteFile, payload);
      if (data) {
        message.success("删除成功");
        yield put({ type: "query" });
      }
    },
    *onSubmit({ payload }, { call, put }) {
      if (payload == "") {
        message.error("内容不能为空");
        return false;
      }
      var json = {};
      if (localStorage.userId) {
        json["userId"] = localStorage.userID;
      } else json["userId"] = "4";
      json["comment"] = payload;
      const data = yield call(saveComment, json);
      if (data) {
        message.success("发表成功");
      }
    },
    *showComment({ payload }, { call, put }) {
      const commentData = yield call(getComment);
      yield put({
        type: "querySuccess",
        payload: {
          commentData: commentData,
          commentVisible: true,
          commentLoading: false
        }
      });
    }
  },

  reducers: {
    onChange(state, action) {
      state.value = action.payload;
      state.value.toString("html");
      return { ...state };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
