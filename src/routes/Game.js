import React, { PropTypes } from "react";
import { connect } from "dva";
import ShowImage from "../components/Game/showImage";

function Game({ location, dispatch, game }) {
  const {
    picOpen,
    projectList,
    dataArray,
    previewVisible,
    previewImage,
    state
  } = game;
  const showImageProps = {
    picOpen: picOpen,
    projectList: projectList,
    dataArray: dataArray,
    previewVisible: previewVisible,
    previewImage: previewImage,
    state: state,
    storePicOpen(value) {
      dispatch({ type: "game/querySuccess", payload: { picOpen: value } });
    },
    handleChange(value) {
      dispatch({
        type: "game/showProjectDetail",
        payload: { projectId: value }
      });
    },
    handleCancel() {
      dispatch({
        type: "game/querySuccess",
        payload: { previewVisible: false }
      });
    },
    changeState(value) {
      dispatch({ type: "game/querySuccess", payload: { state: value } });
    },
    handlePreview(value) {
      dispatch({
        type: "game/querySuccess",
        payload: { previewVisible: true, previewImage: value.image }
      });
    }
  };
  return (
    <div>
      <div style={{ marginTop: 64 }} />
      <ShowImage {...showImageProps} />
    </div>
  );
}

Game.propTypes = {
  game: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};
function mapStateToProps({ game }) {
  return { game };
}

export default connect(mapStateToProps)(Game);
