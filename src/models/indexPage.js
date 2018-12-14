export default {
  namespace: "indexPage",

  state: {
    loading: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/upload") {
          dispatch({
            type: "query",
            payload: location.query
          });
        }
      });
    }
  },

  effects: {
    *query({ payload }, { call, put }) {}
  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
