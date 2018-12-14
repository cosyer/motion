import React, { PropTypes } from "react";
import { Menu, Icon, Button } from "antd";
import { connect } from "dva";
import { Link, hashHistory } from "dva/router";
import { props } from "../../../utils";
import styles from "./main.less";

const SubMenu = Menu.SubMenu;

function Header({ location, dispatch }) {
  function handleClickMenu(item) {
    if (item.key == "logout") {
      dispatch({
        type: "appModel/logout",
        payload: { userID: localStorage.userID }
      });
      localStorage.clear();
      hashHistory.push("/login");
    }
    if (item.key == "github") {
      window.open(props.github, "_blank");
    }
    if (item.key == "api") {
      window.open(props.api, "_blank");
    }
    if (item.key == "blog") {
      window.open(props.blog, "_blank");
    }
  }

  return (
    <div className={styles.header}>
      <Menu className="header-menu" mode="horizontal" onClick={handleClickMenu}>
        <Menu.Item key="goBack">
          <Link to="/home">
            <Icon type="left" />
            返回
          </Link>
        </Menu.Item>
        <SubMenu
          style={{
            float: "right"
          }}
          title={
            <span>
              {" "}
              <Icon type="user" />
              {localStorage.username}
            </span>
          }
        >
          <Menu.Item key="logout">
            <Icon type="poweroff" />
            注销
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="mail" style={{ float: "right", fontSize: "18px" }}>
          <a href={"mailto:" + props.email}>
            <Icon type="mail" size="lg" />
          </a>
        </Menu.Item>
        <Menu.Item key="github" style={{ float: "right", fontSize: "18px" }}>
          <Icon type="github" size="lg" />
        </Menu.Item>
        <Menu.Item key="api" style={{ float: "right", fontSize: "18px" }}>
          <Icon type="api" size="lg" />
        </Menu.Item>
        <Menu.Item key="blog" style={{ float: "right", fontSize: "18px" }}>
          <Icon type="book" size="lg" />
        </Menu.Item>
      </Menu>
    </div>
  );
}

Header.propTypes = {
  location: PropTypes.object
};

function mapStateToProps({ appModel }) {
  return { appModel };
}
export default connect(mapStateToProps)(Header);
