import React, { PropTypes } from "react";
import { connect } from "dva";
import { message } from "antd";
import Search from "../../components/Cms/UserManage/userManageSearch";
import List from "../../components/Cms/UserManage/userManageList";
import Modal from "../../components/Cms/UserManage/userManageModal";
import UserRoleModal from "../../components/Cms/UserManage/userManageRoleModal";
function UserManage({ location, dispatch, userManage }) {
  const {
    userId,
    roleList,
    checkedList,
    userRoleVisible,
    userList,
    loading,
    visible,
    actionType,
    selectedRowKeys,
    item
  } = userManage;
  const searchProps = {
    onSearch(value) {
      if (!value.keyword) {
        value.keyword = "";
      }
      dispatch({ type: "userManage/searchByKey", payload: value });
    },
    onAdd() {
      dispatch({
        type: "userManage/querySuccess",
        payload: { visible: true, actionType: "add" }
      });
    },
    onEdit() {
      if (item.length > 1) {
        message.error("只能编辑单条数据");
      } else if (item.length == 0) {
        message.error("请先选择一条数据");
      } else
        dispatch({
          type: "userManage/querySuccess",
          payload: { visible: true, actionType: "edit" }
        });
    }
  };
  const listProps = {
    loading: loading,
    dataSource: userList,
    selectedRowKeys: selectedRowKeys,
    onSelectChange(key, value) {
      dispatch({
        type: "userManage/querySuccess",
        payload: { selectedRowKeys: key, item: value }
      });
    },
    onDeleteItem(value) {
      dispatch({ type: "userManage/deleteUser", payload: { id: value } });
    },
    onUserRole(id) {
      dispatch({ type: "userManage/querySuccess", payload: { userId: id } });
      dispatch({ type: "userManage/userRole", payload: { userID: id } });
    }
  };
  const modalProps = {
    visible: visible,
    actionType: actionType,
    currentItem: item[0],
    onCancel() {
      dispatch({
        type: "userManage/querySuccess",
        payload: { visible: false, actionType: "", selectedRowKeys: [] }
      });
    },
    onOk(value) {
      dispatch({
        type: "userManage/querySuccess",
        payload: { visible: false, actionType: "", selectedRowKeys: [] }
      });
      if (actionType == "add") {
        dispatch({
          type: "login/register",
          payload: {
            userName: value.re_userName,
            password: value.re_password,
            email: value.email
          }
        });
      } else {
        dispatch({
          type: "userManage/updateUser",
          payload: {
            id: item[0].id,
            userName: value.userName,
            email: value.email
          }
        });
      }
    }
  };
  const userRoleModalProps = {
    visible: userRoleVisible,
    roleList: roleList,
    checkedList: checkedList,
    handleChange(value) {
      dispatch({
        type: "userManage/querySuccess",
        payload: { checkedList: value }
      });
    },
    onCancel() {
      dispatch({
        type: "userManage/querySuccess",
        payload: { userRoleVisible: false }
      });
    },
    onOk() {
      dispatch({
        type: "userManage/addUserRole",
        payload: { userID: userId, roleStr: checkedList.toString() }
      });
    }
  };
  return (
    <div>
      <Search {...searchProps} />
      <List {...listProps} />
      <Modal {...modalProps} />
      <UserRoleModal {...userRoleModalProps} />
    </div>
  );
}

UserManage.propTypes = {
  location: PropTypes.object
};

function mapStateToProps({ userManage }) {
  return { userManage };
}
export default connect(mapStateToProps)(UserManage);
