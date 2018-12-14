import { message } from "antd";
import { getProjectList, getProjectDetail } from "../services/game";
export default {
  namespace: "game",

  state: {
    loading: false,
    picOpen: {},
    projectList: [],
    dataArray: [],
    previewVisible: false,
    previewImage: "",
    state: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/game") {
          dispatch({
            type: "query",
            payload: {}
          });
        }
      });
    }
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(getProjectList);
      yield put({
        type: "querySuccess",
        payload: {
          projectList: data,
          picOpen: [],
          dataArray: [
            {
              image:
                "https://zos.alipayobjects.com/rmsportal/DGOtoWASeguMJgV.png",
              content:
                "Taiwan called motorcycle, motor bike [1] or a motorcycle," +
                " the motorcycle referred to in the mainland, Hong Kong and Southeast" +
                " Asia known as motorcycles.",
              title: "Motorcycle"
            },
            {
              image:
                "https://zos.alipayobjects.com/rmsportal/BXJNKCeUSkhQoSS.png",
              content:
                "Taiwan called motorcycle, motor bike [1] or a motorcycle," +
                " the motorcycle referred to in the mainland, Hong Kong and Southeast" +
                " Asia known as motorcycles.",
              title: "Motorcycle"
            },
            {
              image:
                "https://zos.alipayobjects.com/rmsportal/TDIbcrKdLWVeWJM.png",
              content:
                "Taiwan called motorcycle, motor bike [1] or a motorcycle," +
                " the motorcycle referred to in the mainland, Hong Kong and Southeast" +
                " Asia known as motorcycles.",
              title: "Motorcycle"
            },
            {
              image:
                "https://zos.alipayobjects.com/rmsportal/SDLiKqyfBvnKMrA.png",
              content:
                "Taiwan called motorcycle, motor bike [1] or a motorcycle," +
                " the motorcycle referred to in the mainland, Hong Kong and Southeast" +
                " Asia known as motorcycles.",
              title: "Motorcycle"
            },
            {
              image:
                "https://zos.alipayobjects.com/rmsportal/UcVbOrSDHCLPqLG.png",
              content:
                "Taiwan called motorcycle, motor bike [1] or a motorcycle," +
                " the motorcycle referred to in the mainland, Hong Kong and Southeast" +
                " Asia known as motorcycles.",
              title: "Motorcycle"
            },
            {
              image:
                "https://zos.alipayobjects.com/rmsportal/QJmGZYJBRLkxFSy.png",
              content:
                "Taiwan called motorcycle, motor bike [1] or a motorcycle," +
                " the motorcycle referred to in the mainland, Hong Kong and Southeast" +
                " Asia known as motorcycles.",
              title: "Motorcycle"
            },
            {
              image:
                "https://zos.alipayobjects.com/rmsportal/PDiTkHViQNVHddN.png",
              content:
                "Taiwan called motorcycle, motor bike [1] or a motorcycle," +
                " the motorcycle referred to in the mainland, Hong Kong and Southeast" +
                " Asia known as motorcycles.",
              title: "Motorcycle"
            },
            {
              image:
                "https://zos.alipayobjects.com/rmsportal/beHtidyjUMOXbkI.png",
              content:
                "Taiwan called motorcycle, motor bike [1] or a motorcycle," +
                " the motorcycle referred to in the mainland, Hong Kong and Southeast" +
                " Asia known as motorcycles.",
              title: "Motorcycle"
            },
            {
              image:
                "https://zos.alipayobjects.com/rmsportal/vJcpMCTaSKSVWyH.png",
              content:
                "Taiwan called motorcycle, motor bike [1] or a motorcycle," +
                " the motorcycle referred to in the mainland, Hong Kong and Southeast" +
                " Asia known as motorcycles.",
              title: "Motorcycle"
            },
            {
              image:
                "https://zos.alipayobjects.com/rmsportal/dvQuFtUoRmvWLsZ.png",
              content:
                "Taiwan called motorcycle, motor bike [1] or a motorcycle," +
                " the motorcycle referred to in the mainland, Hong Kong and Southeast" +
                " Asia known as motorcycles.",
              title: "Motorcycle"
            },
            {
              image:
                "https://zos.alipayobjects.com/rmsportal/QqWQKvgLSJaYbpr.png",
              content:
                "Taiwan called motorcycle, motor bike [1] or a motorcycle," +
                " the motorcycle referred to in the mainland, Hong Kong and Southeast" +
                " Asia known as motorcycles.",
              title: "Motorcycle"
            },
            {
              image:
                "https://zos.alipayobjects.com/rmsportal/pTfNdthdsUpLPLJ.png",
              content:
                "Taiwan called motorcycle, motor bike [1] or a motorcycle," +
                " the motorcycle referred to in the mainland, Hong Kong and Southeast" +
                " Asia known as motorcycles.",
              title: "Motorcycle"
            }
          ],
          state: false
        }
      });
    },
    *showProjectDetail({ payload }, { call, put }) {
      const data = yield call(getProjectDetail, payload);
      if (data.length > 0) {
        yield put({ type: "querySuccess", payload: { dataArray: data } });
      } else message.info("暂无数据");
    }
  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
