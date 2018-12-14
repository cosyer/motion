import React from "react";
import {
  Table,
  Tabs,
  Icon,
  Form,
  Menu,
  Input,
  Button,
  Select,
  Popconfirm
} from "antd";
import styles from "./main.less";
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const main = ({
  loading,
  selectedRowKeys,
  selectedRowKeysBook,
  selectedRowKeysQuotation,
  selectedRowKeysAccount,
  commentData,
  bookData,
  quotationData,
  accountData,
  onSelectChange,
  onSelectBookChange,
  onSelectQuotationChange,
  onSelectAccountChange,
  onChange,
  onSearch,
  onEditItem,
  onDeleteItem,
  onAdd,
  signOut,
  reload,
  form: { getFieldDecorator, validateFields, getFieldsValue }
}) => {
  const pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    total: null
  };
  // comment
  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: onSelectChange
  };
  const columns = [
    {
      title: "标识",
      width: "5%",
      dataIndex: "comment_id"
    },
    { title: "作品名称", width: "10%", dataIndex: "name" },
    {
      title: "类型",
      width: "10%",
      dataIndex: "type",
      filters: [
        {
          text: "动画",
          value: "动画"
        },
        {
          text: "电影",
          value: "电影"
        },
        {
          text: "动画电影",
          value: "动画电影"
        }
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.is_used.indexOf(type) === 0
    },
    {
      title: "简介",
      width: "35%",
      dataIndex: "descripation"
    },
    {
      title: "评分",
      width: "5%",
      dataIndex: "mark",
      sorter: (a, b) => a.mark - b.mark
    },
    {
      title: "评论",
      width: "35%",
      dataIndex: "comment"
    }
  ];
  // book
  const rowSelectionBook = {
    selectedRowKeysBook,
    onChange: onSelectBookChange
  };
  const bookColumns = [
    { title: "书名", width: "25%", dataIndex: "book_name" },
    {
      title: "类别",
      width: "25%",
      dataIndex: "classify"
    },
    {
      title: "简介",
      width: "25%",
      dataIndex: "descripation"
    },
    {
      title: "图片",
      width: "25%",
      render: record => <img src={record.book_pic} width="50%" />
    }
  ];
  // quotation
  const rowSelectionQuotation = {
    selectedRowKeysQuotation,
    onChange: onSelectQuotationChange
  };
  const quotationColumns = [
    {
      title: "标识",
      width: "33%",
      dataIndex: "quotation_id"
    },
    { title: "内容", width: "33%", dataIndex: "content" },
    {
      title: "状态",
      width: "33%",
      dataIndex: "status"
    }
  ];
  // account
  const rowSelectionAccount = {
    selectedRowKeysAccount,
    onChange: onSelectAccountChange
  };
  const accountColumns = [
    {
      title: "标识",
      width: "20%",
      dataIndex: "account_id"
    },
    { title: "帐号名", width: "20%", dataIndex: "account_name" },
    {
      title: "帐号类型",
      width: "20%",
      dataIndex: "type"
    },
    {
      title: "用户名",
      width: "20%",
      dataIndex: "user_name"
    },
    {
      title: "因子",
      width: "20%",
      dataIndex: "factor"
    }
  ];
  return (
    <div style={{ padding: "0 10px" }}>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane
          tab={
            <span>
              <Icon type="pushpin" />
              我的评论
            </span>
          }
          key="1"
        >
          <div className={styles.normal}>
            <div className={styles.search}>
              <Form layout="inline">
                <Form.Item>
                  <Select defaultValue="作品名称">
                    <Select.Option value="name">作品名称</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item hasFeedback>
                  <Search
                    placeholder="请输入作品名称"
                    style={{ width: 120 }}
                    onSearch={onSearch}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    shape="circle"
                    icon="reload"
                    size="small"
                    onClick={reload}
                  />
                </Form.Item>
              </Form>
            </div>
            {localStorage.username == "admin" && (
              <p>
                <Button
                  onClick={() => onEditItem()}
                  style={{
                    marginRight: 4
                  }}
                >
                  编辑
                </Button>
                <Popconfirm
                  title="确定要删除吗？"
                  onConfirm={() => onDeleteItem()}
                >
                  <Button
                    style={{
                      marginRight: 4
                    }}
                  >
                    删除
                  </Button>
                </Popconfirm>
              </p>
            )}
            {localStorage.username == "admin" && (
              <div className={styles.create}>
                <Button onClick={onAdd}>添加</Button>
              </div>
            )}
          </div>
          <Table
            bordered
            rowSelection={rowSelection}
            columns={columns}
            dataSource={commentData}
            loading={loading}
            pagination={pagination}
            rowKey={record => record.comment_id}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="book" />
              我的书籍
            </span>
          }
          key="2"
        >
          <Table
            bordered
            rowSelection={rowSelectionBook}
            columns={bookColumns}
            dataSource={bookData}
            loading={loading}
            pagination={pagination}
            rowKey={record => record.book_id}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="paper-clip" />
              我的语录
            </span>
          }
          key="3"
        >
          <Table
            bordered
            rowSelection={rowSelectionQuotation}
            columns={quotationColumns}
            dataSource={quotationData}
            loading={loading}
            pagination={pagination}
            rowKey={record => record.quotation_id}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="user" />
              我的帐号
            </span>
          }
          key="4"
        >
          <Table
            bordered
            rowSelection={quotationColumns}
            columns={accountColumns}
            dataSource={accountData}
            loading={loading}
            pagination={pagination}
            rowKey={record => record.account_id}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Form.create()(main);
