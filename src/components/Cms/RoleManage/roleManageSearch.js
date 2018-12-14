import React, { PropTypes } from "react";
import { Form, Input, Button, Select } from "antd";
import styles from "./roleManageSearch.less";

const Option = Select.Option;

const roleManageSearch = ({
  onSearch,
  onAdd,
  onMenu,
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
  function changeTabPosition(tabPosition) {
    tabPosition = tabPosition;
  }

  return (
    <div className={styles.normal}>
      <div className={styles.search} onSubmit={handleSubmit}>
        <Form layout="inline">
          <Form.Item>
            <Select defaultValue="角色名">
              <Option value="role_name">角色名</Option>
            </Select>
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator("keyword")(
              <Input placeholder="请输入想要搜索的值" />
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
        <Button type="ghost" size="large" onClick={onMenu}>
          菜单分配
        </Button>
        <Button type="ghost" size="large" onClick={onAdd}>
          新增角色
        </Button>
      </div>
    </div>
  );
};

roleManageSearch.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
  handleChange: PropTypes.func
};

export default Form.create()(roleManageSearch);
