import React, { PropTypes } from "react";
import { Tabs, Icon, message } from "antd";
import { connect } from "dva";
import Age from "../../components/Cms/Microapp/age";
import Bmi from "../../components/Cms/Microapp/bmi";
import Salary from "../../components/Cms/Microapp/salary";
import House from "../../components/Cms/Microapp/house";
import QRcode from "../../components/Cms/Microapp/qrcode";
import Weather from "../../components/Cms/Microapp/weather";
import Regexp from "../../components/Cms/Microapp/regexp";
const TabPane = Tabs.TabPane;
function Microapp({ location, dispatch, picture }) {
  const { size, value, bgColor, fgColor, level, weatherData } = picture;
  const qrcodeProps = {
    size: size,
    value: value,
    bgColor: bgColor,
    fgColor: fgColor,
    level: level,
    changeSize(value) {
      if (typeof value != "number") {
        message.info("只能输入数字哦");
        return false;
      }
      dispatch({ type: "picture/querySuccess", payload: { size: value } });
    },
    changeValue(e) {
      dispatch({
        type: "picture/querySuccess",
        payload: { value: e.target.value }
      });
    },
    changeBgColor(e) {
      dispatch({
        type: "picture/querySuccess",
        payload: { bgColor: e.target.value }
      });
    },
    changeFgColor(e) {
      dispatch({
        type: "picture/querySuccess",
        payload: { fgColor: e.target.value }
      });
    },
    changeLevel(value) {
      dispatch({ type: "picture/querySuccess", payload: { level: value } });
    },
    onReload() {
      dispatch({
        type: "picture/querySuccess",
        payload: {
          size: 128,
          value: "http://www.cnblogs.com/cosyer/",
          bgColor: "#FFFFFF",
          fgColor: "#000000",
          level: "L"
        }
      });
    }
  };
  const weatherProps = {
    weatherData: weatherData,
    searchWeather(value) {
      if (value) {
        dispatch({
          type: "picture/searchWeather",
          payload: { cityName: value }
        });
      } else message.info("请输入城市名");
    },
    searchByHistory(value) {
      dispatch({ type: "picture/searchWeather", payload: { cityName: value } });
    },
    closeHistory(value) {
      console.log(value);
      let e = window.event;
      // 阻止事件冒泡
      e.preventDefault();
    }
  };
  const regexpProps = {};
  function callback(value) {
    console.log(value);
  }
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane
          tab={
            <span>
              <Icon type="clock-circle" />
              年龄
            </span>
          }
          key="1"
        >
          <Age />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="calculator" />
              健康
            </span>
          }
          key="2"
        >
          <Bmi />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="pay-circle" />
              工资
            </span>
          }
          key="3"
        >
          <Salary />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="bank" />
              房租
            </span>
          }
          key="4"
        >
          <House />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="qrcode" />
              二维码
            </span>
          }
          key="5"
        >
          <QRcode {...qrcodeProps} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="cloud-o" />
              天气
            </span>
          }
          key="6"
        >
          <Weather {...weatherProps} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="api" />
              正则
            </span>
          }
          key="7"
        >
          <Regexp {...regexpProps} />
        </TabPane>
      </Tabs>
    </div>
  );
}

Microapp.propTypes = {
  location: PropTypes.object
};

function mapStateToProps({ picture }) {
  return { picture };
}
export default connect(mapStateToProps)(Microapp);
