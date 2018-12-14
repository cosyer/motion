import React, { PropTypes } from "react";
import { Form, Input, Button, Select } from "antd";
import styles from "./userManageSearch.less";

const userManageSearch = ({
  keyword,
  onSearch,
  onAdd,
  onEdit,
  form: { getFieldDecorator, validateFields, getFieldsValue }
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields(errors => {
      if (!!errors) {
        return;
      }
      onSearch(getFieldsValue());
    });
  }

  return (
    <div className={styles.normal}>
      <div className={styles.search} onSubmit={handleSubmit}>
        <Form layout="inline">
          <Form.Item>
            {getFieldDecorator("type", {
              initialValue: "用户名"
            })(
              <Select>
                <Select.Option value="用户名">用户名</Select.Option>
                <Select.Option value="角色名">角色名</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator("keyword", {})(
              <Input placeholder="请输入关键字" />
            )}
          </Form.Item>
          <Button
            type="primary"
            size="large"
            icon="search"
            htmlType="submit"
            style={{
              marginRight: 4
            }}
          >
            搜索
          </Button>
        </Form>
      </div>
      <div className={styles.create}>
        <Button
          className={styles.editButton}
          type="primary"
          size="large"
          onClick={onEdit}
        >
          编辑用户
        </Button>
        <Button type="ghost" size="large" onClick={onAdd}>
          新建用户
        </Button>
      </div>
    </div>
  );
};

userManageSearch.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func
};

export default Form.create()(userManageSearch);
