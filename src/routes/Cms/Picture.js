import React, { PropTypes } from "react";
import { message } from "antd";
import { connect } from "dva";
import List from "../../components/Cms/Picture/pictureList";
function Picture({ location, dispatch, picture }) {
  const { pictureArray, previewImage, previewVisible, index } = picture;
  const pictureListProps = {
    pictureArray: pictureArray,
    previewImage: previewImage,
    previewVisible: previewVisible,
    preview(index) {
      var url = "http://tnfs.tngou.net/image" + pictureArray[index].img;
      dispatch({
        type: "picture/querySuccess",
        payload: { previewImage: url, previewVisible: true, index: index }
      });
    },
    handleCancel() {
      dispatch({
        type: "picture/querySuccess",
        payload: { previewVisible: false }
      });
    },
    prePic() {
      if (index == 0) {
        message.info("已经是第一张");
        return false;
      }
      var url = "http://tnfs.tngou.net/image" + pictureArray[index - 1].img;
      dispatch({
        type: "picture/querySuccess",
        payload: { previewImage: url, index: index - 1 }
      });
    },
    nextPic() {
      if (index == pictureArray.length - 1) {
        message.info("已经是最后一张");
        return false;
      }
      var url = "http://tnfs.tngou.net/image" + pictureArray[index + 1].img;
      dispatch({
        type: "picture/querySuccess",
        payload: { previewImage: url, index: index + 1 }
      });
    },
    handleChange(value) {
      dispatch({ type: "picture/getPictureListById", payload: { id: value } });
    }
  };
  return (
    <div>
      <List {...pictureListProps} />
    </div>
  );
}

Picture.propTypes = {
  location: PropTypes.object
};
function mapStateToProps({ picture }) {
  return { picture };
}
export default connect(mapStateToProps)(Picture);
