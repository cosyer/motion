import React from "react";
import { Table, Popconfirm, Switch } from "antd";
const pagination = {
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: total => `共 ${total} 条`,
  total: null
};

const menuManageList = ({
  loading,
  menuListData,
  onSelectChange,
  selectedRowKeys,
  changeState,
  deleteMenu,
  addMenu,
  editMenu
}) => {
  // 分离出子元素
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

  const data = fn(menuListData, -1);

  const columns = [
    {
      title: "菜单名称",
      dataIndex: "menu_name",
      width: "30%"
    },
    {
      title: "编号",
      dataIndex: "code",
      width: "20%"
    },
    {
      title: "菜单路径",
      dataIndex: "src",
      width: "20%"
    },
    {
      title: "操作",
      render: (text, record) => (
        <span>
          <Switch
            defaultChecked={record.state == 1}
            checkedChildren={"显示"}
            unCheckedChildren={"隐藏"}
            onChange={state => changeState(state, record.menu_id)}
          />
          <span className="ant-divider" />
          <a onClick={() => editMenu(record)}>编辑</a>
          <span className="ant-divider" />
          <a onClick={() => addMenu(record)}>新增</a>
          <span className="ant-divider" />
          <Popconfirm
            title="确定要删除该菜单吗？"
            onConfirm={() => deleteMenu(record.menu_id)}
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      )
    }
  ];
  return (
    <div>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        rowKey={record => record.menu_id}
      />
    </div>
  );
};
export default menuManageList;
