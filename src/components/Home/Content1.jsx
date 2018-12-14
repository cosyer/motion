import React from "react";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import { Icon } from "antd";
import styles from "./Nav.less";
class Content extends React.Component {
  static propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string
  };

  static defaultProps = {
    className: "content0"
  };

  render() {
    return (
      <div
        {...this.props}
        className="content-template-wrapper content-half-wrapper"
      >
        <OverPack
          className={`content-template ${this.props.className}`}
          hideProps={{ img: { reverse: true } }}
          location={this.props.id}
        >
          <TweenOne
            key="img"
            animation={{ x: "-=30", opacity: 0, type: "from" }}
            className={`${this.props.className}-img`}
          >
            <span>
              <img
                width="100%"
                src="http://dir.mydearest.cn/motion/image/component3.png"
              />
            </span>
          </TweenOne>
          <QueueAnim
            className={`${this.props.className}-text`}
            key="text"
            leaveReverse
            ease={["easeOutCubic", "easeInCubic"]}
          >
            <h1 key="h1">大学经历</h1>
            <p key="p" style={{ fontSize: 18 }}>
              大学我的专业是电子信息科学与技术，比较偏向通信和嵌入式开发。大一大二学习了C语言程序设计，数据库设计以及数据结构等专业性课程。直到大三一时兴起参加了学校二级院系双体系的选拔，
              历经笔试面试，出乎我的意料之外我最终成功进入了Java项目二部，开始了我的编程之路。
              可能在别人看来代码生活是枯燥乏味的，但我却迷恋着它带给我的成就感和技术充实感。只想说撸代码有意思极了！
              <span
                className={styles.introduce}
                onClick={() =>
                  (window.location.href = "http://chenyu.mydearest.cn/")
                }
              >
                自我介绍
                <Icon type="double-right" className={styles.icon} />
              </span>
            </p>
          </QueueAnim>
        </OverPack>
      </div>
    );
  }
}

export default Content;
