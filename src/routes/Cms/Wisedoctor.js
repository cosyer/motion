import React, { PropTypes } from "react";
import { connect } from "dva";
import { Tabs, Icon, message } from "antd";
import List from "../../components/Cms/Wisedoctor/drugList";
const TabPane = Tabs.TabPane;
function Wisedoctor({ location, dispatch, wisedoctor }) {
  const {
    drugArray,
    previewImage,
    previewVisible,
    index,
    controller,
    loading
  } = wisedoctor;
  const drugListProps = {
    loading: loading,
    drugArray: drugArray,
    previewImage: previewImage,
    previewVisible: previewVisible,
    controller: controller,
    preview(index) {
      var url = "http://tnfs.tngou.net/image" + drugArray[index].img;
      dispatch({
        type: "wisedoctor/querySuccess",
        payload: { previewImage: url, previewVisible: true, index: index }
      });
    },
    handleCancel() {
      dispatch({
        type: "wisedoctor/querySuccess",
        payload: { previewVisible: false }
      });
    },
    prePic() {
      if (index == 0) {
        message.info("已经是第一张");
        return false;
      }
      var url = "http://tnfs.tngou.net/image" + drugArray[index - 1].img;
      dispatch({
        type: "wisedoctor/querySuccess",
        payload: { previewImage: url, index: index - 1 }
      });
    },
    nextPic() {
      if (index == drugArray.length - 1) {
        message.info("已经是最后一张");
        return false;
      }
      var url = "http://tnfs.tngou.net/image" + drugArray[index + 1].img;
      dispatch({
        type: "wisedoctor/querySuccess",
        payload: { previewImage: url, index: index + 1 }
      });
    },
    handleChange(value) {
      dispatch({ type: "wisedoctor/getDrugListById", payload: { id: value } });
    },
    changeSwitch(value) {
      dispatch({
        type: "wisedoctor/querySuccess",
        payload: { controller: value }
      });
    }
  };
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <Icon type="bars" />
              药品列表
            </span>
          }
          key="1"
        >
          <List {...drugListProps} />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
}

Wisedoctor.propTypes = {
  location: PropTypes.object
};

export default connect(({ wisedoctor }) => ({ wisedoctor }))(Wisedoctor);
