import React, { PropTypes } from "react";
import { connect } from "dva";
import { Table, Button, message } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";
import { hashHistory } from "dva/router";
import config from "../utils/config";
import styles from "./error.less";
function Download({ location, dispatch, upload }) {
  const { fileList } = upload;
  function deleteFile(uid, url) {
    dispatch({
      type: "upload/deleteFile",
      payload: { uid: uid, url: url }
    });
  }
  function goBack() {
    hashHistory.push("/upload");
  }
  const columns = [
    {
      title: "文件名",
      width: "16%",
      dataIndex: "name"
    },
    { title: "原文件名", width: "16%", dataIndex: "origin_name" },
    {
      title: "文件路径",
      width: "16%",
      dataIndex: "url",
      render: (text, record) => (
        <a href={record.url} download>
          {text}
        </a>
      )
    },
    {
      title: "文件大小",
      width: "16%",
      dataIndex: "size"
    },
    {
      title: "上传时间",
      width: "16%",
      dataIndex: "time"
    },
    {
      title: "操作",
      width: "16%",
      render: record => (
        <div>
          <a
            href={
              config.host +
              "/upload/fileDownload?fileName=" +
              record.name +
              "&url=" +
              record.url
            }
            target="_blank"
          >
            <Button type="primary">下载</Button>
          </a>
          <Button
            type="primary"
            style={{ marginLeft: 5, marginRight: 5 }}
            onClick={() => deleteFile(record.uid, record.url)}
          >
            删除
          </Button>
          <CopyToClipboard
            text={record.url}
            onCopy={() => message.success("复制成功")}
          >
            <Button type="primary">复制</Button>
          </CopyToClipboard>
        </div>
      )
    }
  ];
  const pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    total: null
  };
  return (
    <div className={styles.bg}>
      <Button type="primary" icon="rollback" shape="circle" onClick={goBack} />
      <span className={styles.downloadText}>下载列表：</span>
      <Table
        style={{ marginTop: 5 }}
        bordered
        columns={columns}
        dataSource={fileList}
        pagination={pagination}
        rowKey={record => record.uid}
      />
    </div>
  );
}

Download.propTypes = {
  upload: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps({ upload }) {
  return { upload };
}

export default connect(mapStateToProps)(Download);
