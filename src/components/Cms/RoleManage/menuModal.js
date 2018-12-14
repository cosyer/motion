import React from "react";
import { Tree, Form, Row, Col, Modal, Icon } from "antd";

const TreeNode = Tree.TreeNode;

const menuModel = ({
  visible,
  data = {},
  onOk,
  onCancel,
  checkedKeys,
  title,
  onSelectMenuChange,
  form: { validateFields, getFieldsValue }
}) => {
  function handleOk() {
    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = { ...getFieldsValue() };
      onOk(data);
    });
  }
  const modalOpts = {
    title: title,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: "vertical-center-modal"
  };

  function fn(data, p_id) {
    var result = [],
      temp;
    for (var i = 0; i < data.length; i++) {
      if (data[i].p_id == p_id) {
        var obj = data[i];
        temp = fn(data, data[i].menu_id);
        if (temp.length > 0) {
          obj.children = temp;
        }
        result.push(obj);
      }
    }
    return result;
  }
  data = fn(data, -1);
  const loop = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={
              <span>
                <Icon type="folder" />
                {item.menu_name}
              </span>
            }
            key={item.menu_id}
            isLeaf={false}
          >
            {loop(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={
            <span>
              <Icon type="file" />
              {item.menu_name}
            </span>
          }
          key={item.menu_id}
          isLeaf={true}
          disabled={item.key === "0-0-0"}
        />
      );
    });
  const treeNodes = loop(data);
  const view = (
    <Row>
      <Col span={12} style={{ height: 300 }}>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={onSelectMenuChange}
        >
          <TreeNode
            title={
              <span>
                <Icon type="folder" />
                所有菜单
              </span>
            }
            key={-1}
          >
            {treeNodes}
          </TreeNode>
        </Tree>
      </Col>
      <Col span={12} />
    </Row>
  );
  return <Modal {...modalOpts}>{view}</Modal>;
};

export default Form.create()(menuModel);
