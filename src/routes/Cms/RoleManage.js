import React, { PropTypes } from "react";
import { connect } from "dva";
import { message, Row, Col } from "antd";
import RoleManageSearch from "../../components/Cms/RoleManage/roleManageSearch";
import RoleManageTable from "../../components/Cms/RoleManage/roleManageTable";
import RoleManageUpdateModal from "../../components/Cms/RoleManage/roleManageUpdateModal";

import MenuModal from "../../components/Cms/RoleManage/menuModal";

function RoleManage({ loaction, dispatch, roleManage }) {
  const {
    loading,
    roleList,
    selectRowKeys,
    currentItem,
    modalVisible,
    selectedRowKeys,
    modalType,
    modalMenuVisible,
    treeList,
    checkedKeys
  } = roleManage;

  const roleManageUpdateModalProps = {
    item: modalType === "add" ? {} : currentItem,
    title: modalType === "add" ? "新增角色" : "修改角色",
    visible: modalVisible,
    onOk(data) {
      if (modalType == "add") {
        dispatch({
          type: `roleManage/add`,
          payload: data
        });
      } else {
        dispatch({
          type: `roleManage/update`,
          payload: data
        });
      }
    },
    onCancel() {
      dispatch({
        type: "roleManage/hideModal"
      });
    }
  };

  // 角色列表数据
  const roleManageTableProps = {
    loading,
    dataSource: roleList,
    selectedRowKeys: selectedRowKeys,
    onSelectChange(key) {
      dispatch({
        type: "roleManage/onSelectChange",
        payload: key
      });
    },
    onEditItem(item) {
      dispatch({
        type: "roleManage/showModal",
        payload: {
          modalType: "update",
          currentItem: item
        }
      });
    },
    onHideItem(key) {
      dispatch({
        type: "roleManage/deleteRole",
        payload: {
          role_id: key
        }
      });
    }
  };

  // 角色搜索功能
  const roleManageSearchProps = {
    onSearch(value) {
      dispatch({
        type: "roleManage/search",
        payload: value
      });
    },
    onAdd(item) {
      dispatch({
        type: "roleManage/showModal",
        payload: {
          modalType: "add"
        }
      });
    },
    onMenu(item) {
      if (!selectedRowKeys || selectedRowKeys.length != 1) {
        message.error(`请选择一个角色进行修改`);
        dispatch({
          type: "roleManage/clearSelectedRowKeys"
        });
      } else {
        dispatch({
          type: "roleManage/queryMenu",
          payload: {
            roleId: selectedRowKeys[0]
          }
        });
      }
    }
  };

  // 菜单管理数据
  const MenuModalProp = {
    title: "菜单分配",
    visible: modalMenuVisible,
    data: treeList,
    checkedKeys: checkedKeys,
    onSelectMenuChange(checkedKeys, e) {
      dispatch({
        type: "roleManage/onSelectMenuChange",
        payload: checkedKeys
      });
    },
    onOk(data) {
      dispatch({
        type: `roleManage/updateRoleMenuRelation`,
        payload: data
      });
    },
    onCancel() {
      dispatch({
        type: `roleManage/hideModal`
      });
    }
  };

  const RoleManageUpdateModelGen = () => (
    <RoleManageUpdateModal {...roleManageUpdateModalProps} />
  );
  return (
    <div>
      <Row>
        <RoleManageSearch {...roleManageSearchProps} />
      </Row>
      <Row>
        <Col span={24}>
          <RoleManageTable {...roleManageTableProps} />
        </Col>
      </Row>
      <RoleManageUpdateModelGen />
      <MenuModal {...MenuModalProp} />
    </div>
  );
}

RoleManage.propTypes = {
  roleManage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps({ roleManage }) {
  return { roleManage };
}

export default connect(mapStateToProps)(RoleManage);
