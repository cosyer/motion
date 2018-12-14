import React, { PropTypes } from "react";
import { Table, Popconfirm } from "antd";
const roleManageTable = ({
  loading,
  dataSource,
  selectedRowKeys,
  onEditItem,
  onHideItem,
  onSelectChange
}) => {
  const pagination = {
    pageSize: 10,
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
      title: "角色名称",
      width: "16%",
      dataIndex: "role_name",
      render: (text, record) => <a onClick={() => onEditItem(record)}>{text}</a>
    },
    {
      title: "角色描述",
      width: "52%",
      dataIndex: "remark"
    },
    {
      title: "创建时间",
      width: "16%",
      dataIndex: "create_time"
    },
    {
      title: "操作",
      width: "16%",
      render: (text, record) => (
        <div>
          <span>
            <a onClick={() => onEditItem(record)}>编辑</a>
            &nbsp;
            <span className="ant-divider" />
            <Popconfirm
              title="确定要删除该角色吗？"
              onConfirm={() => onHideItem(record.role_id)}
            >
              <a>删除角色</a>
            </Popconfirm>
          </span>
        </div>
      )
    }
  ];

  return (
    <div>
      <Table
        bordered
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        rowKey={record => record.role_id}
      />
    </div>
  );
};

roleManageTable.propTypes = {
  onSelectChange: PropTypes.func,
  tabList: PropTypes.array,
  onPageChange: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  onEditItem: PropTypes.func,
  pagination: PropTypes.any
};

export default roleManageTable;
