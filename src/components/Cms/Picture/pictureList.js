import React from "react";
import { Card, Modal, Col, Badge, Select, Row } from "antd";
import classNames from "classnames";
import styles from "./picture.less";
const Option = Select.Option;
const typeList = [
  {
    description: "性感美女",
    id: 1,
    keywords: "性感美女",
    name: "性感美女",
    seq: 1,
    title: "性感美女"
  },
  {
    description: "韩日美女",
    id: 2,
    keywords: "韩日美女",
    name: "韩日美女",
    seq: 2,
    title: "韩日美女"
  },
  {
    description: "丝袜美腿",
    id: 3,
    keywords: "丝袜美腿",
    name: "丝袜美腿",
    seq: 3,
    title: "丝袜美腿"
  },
  {
    description: "美女照片",
    id: 4,
    keywords: "美女照片",
    name: "美女照片",
    seq: 4,
    title: "美女照片"
  },
  {
    description: "美女写真",
    id: 5,
    keywords: "美女写真",
    name: "美女写真",
    seq: 5,
    title: "美女写真"
  },
  {
    description: "清纯美女",
    id: 6,
    keywords: "清纯美女",
    name: "清纯美女",
    seq: 6,
    title: "清纯美女"
  },
  {
    description: "性感车模",
    id: 7,
    keywords: "性感车模",
    name: "性感车模",
    seq: 7,
    title: "性感车模"
  }
];
const typeData = typeList.map((item, index) => (
  <Option value={item.id} key={index}>
    {item.name}
  </Option>
));
const pictureList = ({
  preview,
  previewImage,
  previewVisible,
  handleChange,
  handleCancel,
  pictureArray,
  prePic,
  nextPic
}) => {
  const imageArray = pictureArray.map((item, index) => (
    <Col span="4">
      <Badge count={item.count}>
        <Card
          style={{ width: 120, cursor: "pointer" }}
          bodyStyle={{ padding: 0 }}
          onClick={() => preview(index)}
          key={index}
        >
          <div
            style={{
              width: "100%",
              height: "80px",
              paddingLeft: "2%",
              paddingRight: "2%",
              paddingTop: "2%"
            }}
          >
            <div
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage:
                  "url(" + "http://tnfs.tngou.net/image" + item.img + ")",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div className="custom-card">
            <h3>{item.title}</h3>
            <p />
          </div>
        </Card>
      </Badge>
    </Col>
  ));

  return (
    <div>
      <Row style={{ marginBottom: 20 }}>
        <Select
          style={{ width: 120 }}
          onChange={handleChange}
          showSearch
          allowClear
          placeholder="请选择分类@_@"
        >
          {typeData}
        </Select>
      </Row>
      {imageArray}
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <div className={styles.container}>
          <a
            onClick={prePic}
            className={classNames(styles.arrow, styles.arrow_left)}
          >
            &lt;
          </a>
          <a
            onClick={nextPic}
            className={classNames(styles.arrow, styles.arrow_right)}
          >
            &gt;
          </a>
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </div>
      </Modal>
    </div>
  );
};

export default pictureList;
