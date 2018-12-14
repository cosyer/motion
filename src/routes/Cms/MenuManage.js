import React, { PropTypes } from "react";
import { connect } from "dva";
import MenuManageList from "../../components/Cms/MenuManage/menuManageList";
import MenuManageModal from "../../components/Cms/MenuManage/menuManageModal";
function MenuManage({ location, dispatch, menuManage }) {
  const {
    loading,
    menuListData,
    modalVisible,
    modalType,
    currentItem
  } = menuManage;
  const menuManageListProps = {
    loading: loading,
    menuListData: menuListData,
    changeState(value, menu_id) {
      var state = 0;
      if (value) {
        state = 1;
      } else {
        state = 0;
      }
      dispatch({
        type: "menuManage/changeState",
        payload: { state: state, menu_id: menu_id }
      });
    },
    deleteMenu(value) {
      dispatch({ type: "menuManage/deleteMenu", payload: { menu_id: value } });
    },
    addMenu(record) {
      dispatch({
        type: "menuManage/querySuccess",
        payload: { currentItem: record, modalVisible: true, modalType: "add" }
      });
    },
    editMenu(record) {
      dispatch({
        type: "menuManage/querySuccess",
        payload: { currentItem: record, modalVisible: true, modalType: "edit" }
      });
    }
  };
  const menuManageModalProps = {
    visible: modalVisible,
    modalType: modalType,
    currentItem: currentItem,
    onCancel() {
      dispatch({
        type: "menuManage/querySuccess",
        payload: { modalVisible: false }
      });
    },
    onOk(data) {
      if (modalType == "add") {
        dispatch({
          type: "menuManage/addMenu",
          payload: {
            menu_name: data.menu_name,
            code: data.code,
            src: data.src,
            p_id: currentItem.menu_id
          }
        });
      } else {
        dispatch({
          type: "menuManage/updateMenu",
          payload: {
            menu_name: data.menu_name,
            code: data.code,
            src: data.src,
            menu_id: currentItem.menu_id
          }
        });
      }
    }
  };

  return (
    <div>
      <MenuManageList {...menuManageListProps} />
      <MenuManageModal {...menuManageModalProps} />
    </div>
  );
}
MenuManage.propTypes = {
  menuManage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};
function mapStateToProps({ menuManage }) {
  return { menuManage };
}

export default connect(mapStateToProps)(MenuManage);
