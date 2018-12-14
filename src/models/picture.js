import { message } from "antd";
import {
  getPictureList,
  getPictureListById,
  getData,
  getWeather
} from "../services/picture";
// import jqAjax from "../utils/jqAjaxUtil";
// jqAjax({}, function(data) {
//   console.log("test", data);
// });
export default {
  namespace: "picture",

  state: {
    weatherData: [],
    size: 128,
    value: "http://www.cnblogs.com/cosyer/",
    bgColor: "#FFFFFF",
    fgColor: "#000000",
    level: "L",
    htData: [],
    pictureArray: [],
    previewImage: "",
    previewVisible: false,
    index: ""
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/app/picture") {
          dispatch({
            type: "query",
            payload: location.pathname
          });
        }
        if (location.pathname === "/app/handsontable") {
          dispatch({
            type: "getData",
            payload: location.pathname
          });
        }
      });
    }
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(getPictureList);
      if (data.status) {
        yield put({
          type: "querySuccess",
          payload: { pictureArray: data.tngou }
        });
      }
    },
    *getPictureListById({ payload }, { call, put }) {
      const data = yield call(getPictureListById, payload);
      yield put({
        type: "querySuccess",
        payload: { pictureArray: data.tngou }
      });
    },
    *getData({ payload }, { call, put }) {
      const data = yield call(getData);
      yield put({ type: "querySuccess", payload: { htData: data } });
    },
    *searchWeather({ payload }, { call, put }) {
      const data = JSON.parse(yield call(getWeather, payload));
      if (data.error == 0) {
        if (localStorage.history == undefined) {
          localStorage.history = payload.cityName;
        } else {
          if (localStorage.history.split(",").length <= 6) {
            localStorage.history =
              localStorage.history + "," + payload.cityName;
            // 去重
            function unique(str) {
              var tmpObj = {};
              var uniqueStr = "";
              str
                .split(",")
                .reverse()
                .forEach(function(item) {
                  if (!tmpObj[item]) {
                    tmpObj[item] = 1;
                    if (uniqueStr == "") {
                      uniqueStr = item;
                    } else {
                      uniqueStr = uniqueStr + "," + item;
                    }
                  }
                });
              return uniqueStr;
            }
            localStorage.history = unique(localStorage.history);
          }
        }

        yield put({
          type: "querySuccess",
          payload: { weatherData: data.results[0].weather_data }
        });
      } else message.info(data.status);
    }
  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
    startTest(state, action) {
      console.log(action.payload);
      return { ...state, ...action.payload };
    }
  }
};
