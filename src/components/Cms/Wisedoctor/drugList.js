import React from "react";
import { Card, Modal, Col, Select, Row, Switch, Table } from "antd";
import classNames from "classnames";
import styles from "./wisedoctor.less";
const Option = Select.Option;
const typeList = [
  {
    description:
      "性病用药,性病用药药品,性病用药相关药品,治疗性病用药相关功能的药品,性病用药相关药品查询,性病用药药品库",
    drugclass: 0,
    id: 1,
    keywords: "性病用药",
    name: "性病用药",
    seq: 0,
    title: "性病用药"
  },
  {
    description:
      "抗结核及麻风类,抗结核及麻风类药品,抗结核及麻风类相关药品,治疗抗结核及麻风类相关功能的药品,抗结核及麻风类相关药品查询,抗结核及麻风类药品库",
    drugclass: 0,
    id: 2,
    keywords: "抗结核及麻风类",
    name: "抗结核及麻风类",
    seq: 0,
    title: "抗结核及麻风类"
  },
  {
    description:
      "血液疾病类,血液疾病类药品,血液疾病类相关药品,治疗血液疾病类相关功能的药品,血液疾病类相关药品查询,血液疾病类药品库",
    drugclass: 0,
    id: 3,
    keywords: "血液疾病类",
    name: "血液疾病类",
    seq: 0,
    title: "血液疾病类"
  },
  {
    description:
      "水电解质及酸碱,水电解质及酸碱药品,水电解质及酸碱相关药品,治疗水电解质及酸碱相关功能的药品,水电解质及酸碱相关药品查询,水电解质及酸碱药品库",
    drugclass: 0,
    id: 4,
    keywords: "水电解质及酸碱",
    name: "水电解质及酸碱",
    seq: 0,
    title: "水电解质及酸碱"
  },
  {
    description:
      "抗寄生虫类,抗寄生虫类药品,抗寄生虫类相关药品,治疗抗寄生虫类相关功能的药品,抗寄生虫类相关药品查询,抗寄生虫类药品库",
    drugclass: 0,
    id: 5,
    keywords: "抗寄生虫类",
    name: "抗寄生虫类",
    seq: 0,
    title: "抗寄生虫类"
  },
  {
    description:
      "风湿免疫科,风湿免疫科药品,风湿免疫科相关药品,治疗风湿免疫科相关功能的药品,风湿免疫科相关药品查询,风湿免疫科药品库",
    drugclass: 0,
    id: 6,
    keywords: "风湿免疫科",
    name: "风湿免疫科",
    seq: 0,
    title: "风湿免疫科"
  },
  {
    description:
      "肿瘤科,肿瘤科药品,肿瘤科相关药品,治疗肿瘤科相关功能的药品,肿瘤科相关药品查询,肿瘤科药品库",
    drugclass: 0,
    id: 7,
    keywords: "肿瘤科",
    name: "肿瘤科",
    seq: 0,
    title: "肿瘤科"
  },
  {
    description:
      "神经/精神,神经/精神药品,神经/精神相关药品,治疗神经/精神相关功能的药品,神经/精神相关药品查询,神经/精神药品库",
    drugclass: 0,
    id: 8,
    keywords: "神经/精神",
    name: "神经/精神",
    seq: 0,
    title: "神经/精神"
  },
  {
    description:
      "内分泌失常,内分泌失常药品,内分泌失常相关药品,治疗内分泌失常相关功能的药品,内分泌失常相关药品查询,内分泌失常药品库",
    drugclass: 0,
    id: 9,
    keywords: "内分泌失常",
    name: "内分泌失常",
    seq: 0,
    title: "内分泌失常"
  },
  {
    description:
      "肾病,肾病药品,肾病相关药品,治疗肾病相关功能的药品,肾病相关药品查询,肾病药品库",
    drugclass: 0,
    id: 10,
    keywords: "肾病",
    name: "肾病",
    seq: 0,
    title: "肾病"
  },
  {
    description:
      "肝胆胰用药,肝胆胰用药药品,肝胆胰用药相关药品,治疗肝胆胰用药相关功能的药品,肝胆胰用药相关药品查询,肝胆胰用药药品库",
    drugclass: 0,
    id: 11,
    keywords: "肝胆胰用药",
    name: "肝胆胰用药",
    seq: 0,
    title: "肝胆胰用药"
  },
  {
    description:
      "心脑血管,心脑血管药品,心脑血管相关药品,治疗心脑血管相关功能的药品,心脑血管相关药品查询,心脑血管药品库",
    drugclass: 0,
    id: 12,
    keywords: "心脑血管",
    name: "心脑血管",
    seq: 0,
    title: "心脑血管"
  },
  {
    description:
      "维生素及营养类,维生素及营养类药品,维生素及营养类相关药品,治疗维生素及营养类相关功能的药品,维生素及营养类相关药品查询,维生素及营养类药品库",
    drugclass: 0,
    id: 13,
    keywords: "维生素及营养类",
    name: "维生素及营养类",
    seq: 0,
    title: "维生素及营养类"
  },
  {
    description:
      "儿科用药,儿科用药药品,儿科用药相关药品,治疗儿科用药相关功能的药品,儿科用药相关药品查询,儿科用药药品库",
    drugclass: 0,
    id: 14,
    keywords: "儿科用药",
    name: "儿科用药",
    seq: 0,
    title: "儿科用药"
  },
  {
    description:
      "妇科用药,妇科用药药品,妇科用药相关药品,治疗妇科用药相关功能的药品,妇科用药相关药品查询,妇科用药药品库",
    drugclass: 0,
    id: 15,
    keywords: "妇科用药",
    name: "妇科用药",
    seq: 0,
    title: "妇科用药"
  },
  {
    description:
      "男科用药,男科用药药品,男科用药相关药品,治疗男科用药相关功能的药品,男科用药相关药品查询,男科用药药品库",
    drugclass: 0,
    id: 16,
    keywords: "男科用药",
    name: "男科用药",
    seq: 0,
    title: "男科用药"
  },
  {
    description:
      "家庭常备,家庭常备药品,家庭常备相关药品,治疗家庭常备相关功能的药品,家庭常备相关药品查询,家庭常备药品库",
    drugclass: 0,
    id: 17,
    keywords: "家庭常备",
    name: "家庭常备",
    seq: 0,
    title: "家庭常备"
  },
  {
    description:
      "呼吸系统类,呼吸系统类药品,呼吸系统类相关药品,治疗呼吸系统类相关功能的药品,呼吸系统类相关药品查询,呼吸系统类药品库",
    drugclass: 0,
    id: 18,
    keywords: "呼吸系统类",
    name: "呼吸系统类",
    seq: 0,
    title: "呼吸系统类"
  },
  {
    description:
      "五官用药,五官用药药品,五官用药相关药品,治疗五官用药相关功能的药品,五官用药相关药品查询,五官用药药品库",
    drugclass: 0,
    id: 19,
    keywords: "五官用药",
    name: "五官用药",
    seq: 0,
    title: "五官用药"
  },
  {
    description:
      "肠胃用药,肠胃用药药品,肠胃用药相关药品,治疗肠胃用药相关功能的药品,肠胃用药相关药品查询,肠胃用药药品库",
    drugclass: 0,
    id: 20,
    keywords: "肠胃用药",
    name: "肠胃用药",
    seq: 0,
    title: "肠胃用药"
  },
  {
    description:
      "皮肤用药,皮肤用药药品,皮肤用药相关药品,治疗皮肤用药相关功能的药品,皮肤用药相关药品查询,皮肤用药药品库",
    drugclass: 0,
    id: 21,
    keywords: "皮肤用药",
    name: "皮肤用药",
    seq: 0,
    title: "皮肤用药"
  },
  {
    description:
      "感冒发热,感冒发热药品,感冒发热相关药品,治疗感冒发热相关功能的药品,感冒发热相关药品查询,感冒发热药品库",
    drugclass: 0,
    id: 22,
    keywords: "感冒发热",
    name: "感冒发热",
    seq: 0,
    title: "感冒发热"
  },
  {
    description:
      "手术用药,手术用药药品,手术用药相关药品,治疗手术用药相关功能的药品,手术用药相关药品查询,手术用药药品库",
    drugclass: 0,
    id: 203,
    keywords: "手术用药",
    name: "手术用药",
    seq: 1,
    title: "手术用药"
  },
  {
    description:
      "其他,其他药品,其他相关药品,治疗其他相关功能的药品,其他相关药品查询,其他药品库",
    drugclass: 0,
    id: 201,
    keywords: "其他",
    name: "其他",
    seq: 6,
    title: "其他"
  }
];
const typeData = typeList.map((item, index) => (
  <Option value={item.id} key={index}>
    {item.name}
  </Option>
));
const pagination = {
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: total => `共 ${total} 条`,
  total: null
};
const columns = [
  {
    title: "药名",
    dataIndex: "name",
    width: "16.6%"
  },
  {
    title: "类型",
    width: "16.6%",
    dataIndex: "type"
  },
  {
    title: "简介",
    width: "16.6%",
    dataIndex: "description"
  },
  {
    title: "标签",
    width: "16.6%",
    dataIndex: "tag"
  },
  {
    title: "价格",
    width: "16.6%",
    dataIndex: "price"
  },
  {
    title: "热度",
    width: "16.6%",
    dataIndex: "count"
  }
];
const pictureList = ({
  loading,
  preview,
  previewImage,
  previewVisible,
  handleChange,
  handleCancel,
  drugArray,
  controller,
  changeSwitch,
  prePic,
  nextPic
}) => {
  const imageArray = drugArray.map((item, index) => (
    <Col span="4">
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
          <h3>{item.name}</h3>
          <p />
        </div>
      </Card>
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
        <Switch
          onChange={changeSwitch}
          checkedChildren={"图片"}
          unCheckedChildren={"表格"}
          style={{ float: "right" }}
        />
      </Row>
      {controller && (
        <div>
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
      )}
      {!controller && (
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={drugArray}
          pagination={pagination}
          rowKey={record => record.id}
        />
      )}
    </div>
  );
};

export default pictureList;
