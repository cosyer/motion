import React from "react";
import RichTextEditor from "react-rte";
import { Row, Col, Button, Icon, Modal, Table } from "antd";
import styles from "./upload.less";
const richTextEditor = ({
  value,
  onChange,
  onSubmit,
  showComment,
  handleCancel,
  commentVisible,
  commentLoading,
  commentData
}) => {
  var data = value.toString("html");
  function createMarkup(data) {
    return { __html: data };
  }
  const pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    total: null
  };
  const columns = [
    {
      title: "标识",
      width: "15%",
      dataIndex: "id"
    },
    {
      title: "用户名",
      width: "15%",
      dataIndex: "user_name"
    },
    {
      title: "评论内容",
      width: "40%",
      dataIndex: "content"
    },
    {
      title: "发布时间",
      width: "30%",
      dataIndex: "publish_time"
    }
  ];
  return (
    <div>
      <Row style={{ marginTop: 10 }}>
        <Col span={12}>
          <RichTextEditor value={value} onChange={onChange} />
        </Col>
        <Col span={12}>
          <div dangerouslySetInnerHTML={createMarkup(data)} />
        </Col>
      </Row>
      <Button type="primary" onClick={showComment}>
        <Icon type="message" />
        评论列表
      </Button>
      <Button type="primary" className={styles.submit} onClick={onSubmit}>
        <Icon type="heart" />
        给我留言
      </Button>
      <div id="uyan_frame" className={styles.uyan} />
      <Modal visible={commentVisible} footer={null} onCancel={handleCancel}>
        <Table
          bordered
          pagination={pagination}
          columns={columns}
          dataSource={commentData}
          loading={commentLoading}
          rowKey={record => record.id}
        />
      </Modal>
    </div>
  );
};
export default richTextEditor;
