import React from "react";
import { Checkbox, Modal } from "antd";
const CheckboxGroup = Checkbox.Group;
const userManageRoleModal = ({
  visible,
  roleList,
  checkedList,
  onOk,
  onCancel,
  handleChange
}) => {
  const modalOpts = {
    title: "角色分配",
    visible,
    width: 300,
    onOk,
    onCancel,
    wrapClassName: "vertical-center-modal"
  };
  return (
    <Modal {...modalOpts}>
      <CheckboxGroup
        options={roleList}
        value={checkedList}
        onChange={handleChange}
      />
    </Modal>
  );
};

export default userManageRoleModal;
