import React, { PropTypes } from "react";
import { Menu, Icon, Switch } from "antd";
import { Link } from "dva/router";
import { connect } from "dva";
import styles from "./main.less";
import { props } from "../../../utils";
const getMenus = function(menuArray, parentPath) {
  parentPath = parentPath || "/";
  return menuArray.map(item => {
    if (!!item.child) {
      return (
        <Menu.SubMenu
          key={item.key}
          title={
            <span>
              {item.icon ? <Icon type={item.icon} /> : ""} {item.name}
            </span>
          }
        >
          {getMenus(item.child, parentPath + item.key + "/")}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + item.key}>
            {item.icon ? <Icon type={item.icon} /> : ""}
            {item.name}
          </Link>
        </Menu.Item>
      );
    }
  });
};

function Sider({ location, dispatch, userManage, appModel }) {
  const { theme } = userManage;
  const { menuSelectedKeys, openKeys, menu } = appModel;
  function changeTheme() {
    var data = "";
    if (theme == "dark") {
      data = "light";
      $("#sider").css("background", "#FFF");
      $("#switch").css("background-color", "#FFF");
    } else {
      data = "dark";
      $("#sider").css("background", "#404040");
      $("#switch").css("background-color", "#494949");
    }
    dispatch({ type: "userManage/querySuccess", payload: { theme: data } });
  }
  return (
    <div>
      <div className={styles.logo}>
        <img src={props.logoSrc} />
        <span style={{ color: "grey" }}>Antd Admin</span>
      </div>
      <Menu
        mode="inline"
        theme={theme}
        defaultSelectedKeys={menuSelectedKeys}
        defaultOpenKeys={openKeys}
      >
        {getMenus(menu)}
      </Menu>
      <div className={styles.switchtheme} id="switch">
        <span>
          <Icon type="bulb" />
          切换主题
        </span>
        <Switch
          onChange={changeTheme}
          defaultChecked={true}
          checkedChildren="黑"
          unCheckedChildren="白"
        />
      </div>
    </div>
  );
}

Sider.propTypes = {
  location: PropTypes.object
};

function mapStateToProps({ userManage, appModel }) {
  return { userManage, appModel };
}
export default connect(mapStateToProps)(Sider);
