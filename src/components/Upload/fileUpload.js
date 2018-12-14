import React from "react";
import { Link } from "dva/router";
import { Upload, Button, Icon, Row, Col, Modal, message, Alert } from "antd";
import config from "../../utils/config";
import styles from "./upload.less";
const fileUpload = ({
  fileList,
  previewVisible,
  previewImage,
  handlePreview,
  handleRemove,
  handleCancel,
  handleChange
}) => {
  const props = {
    name: "file",
    action: config.host + "/upload/fileUpload",
    multiple: true,
    listType: "picture",
    headers: {
      authorization: "authorization-text"
    },
    onChange(info) {
      handleChange(info.fileList);
      if (info.file.status !== "uploading") {
        console.log(info.file);
        console.log(info.fileList);
      }
      if (info.file.status == "done") {
        if (info.file.response.state === true) {
          message.info("上传成功");
        } else if (info.file.response.state === false) {
          message.error("上传失败" + info.file.response.msg);
        }
      }
    },
    onPreview: handlePreview,
    onRemove: handleRemove,
    fileList: [...fileList]
  };
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const props2 = {
    name: "file",
    action: config.host + "/upload/fileUpload",
    multiple: true,
    listType: "picture-card",
    headers: {
      authorization: "authorization-text"
    },
    onChange(info) {
      handleChange(info.fileList);
      if (info.file.status !== "uploading") {
        console.log(info.file);
        console.log(info.fileList);
      }
      if (info.file.status == "done") {
        if (info.file.response.state === true) {
          message.info("上传成功");
        } else if (info.file.response.state === false) {
          message.error("上传失败" + info.file.response.msg);
        }
      }
    },
    onPreview: handlePreview,
    onRemove: handleRemove,
    fileList: [...fileList]
  };
  return (
    <Row>
      <Col span={10} style={{ marginRight: 16 }}>
        <Alert
          message={
            <span>
              可上传不大于500M的文件,只有图片才能预览哦0.0
              <Link className={styles.goDownload} to="/download">
                前往下载页面
                <Icon type="download" />
              </Link>
            </span>
          }
          type="info"
          showIcon
          closable
        />
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Upload
          </Button>
        </Upload>
      </Col>
      <Col span={10}>
        <Upload {...props2}>{uploadButton}</Upload>
      </Col>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Row>
  );
};
export default fileUpload;
