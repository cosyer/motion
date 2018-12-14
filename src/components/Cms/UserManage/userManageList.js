import React, { PropTypes } from "react";

import { Table, Popconfirm } from "antd";

function userManageList({
  loading,
  dataSource,
  selectedRowKeys,
  onDeleteItem,
  onSelectChange,
  onUserRole
}) {
  const pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    total: null
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const columns = [
    {
      title: "用户名",
      dataIndex: "user_name",
      width: "10%"
    },
    {
      title: "邮箱",
      width: "10%",
      dataIndex: "email"
    },
    {
      title: "登录ip",
      width: "10%",
      dataIndex: "login_ip"
    },
    {
      title: "登录地点",
      width: "10%",
      dataIndex: "login_location"
    },
    {
      title: "登录状态",
      width: "10%",
      dataIndex: "login_status"
    },
    {
      title: "登录时间",
      width: "10%",
      dataIndex: "login_time"
    },
    {
      title: "创建时间",
      width: "10%",
      dataIndex: "create_time"
    },
    {
      title: "操作",
      render: (text, record) => (
        <span>
          <a onClick={() => onUserRole(record.id)}>角色分配</a>
          <span className="ant-divider" />
          <Popconfirm
            title="确定要删除该用户吗？"
            onConfirm={() => onDeleteItem(record.id)}
          >
            <a>删除用户</a>
          </Popconfirm>
        </span>
      )
    }
  ];
  return (
    <div>
      <Table
        bordered
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
        rowKey={record => record.id}
      />
    </div>
  );
}

userManageList.propTypes = {
  onSelectChange: PropTypes.func,
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  pagination: PropTypes.any
};

export default userManageList;
