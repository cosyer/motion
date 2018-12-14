import React from "react";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";

class Content extends React.Component {
  static propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string
  };

  static defaultProps = {
    className: "content1"
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
          <QueueAnim
            type="left"
            className={`${this.props.className}-text`}
            key="text"
            leaveReverse
            ease={["easeOutCubic", "easeInCubic"]}
          >
            <h1 key="h1">工作经历</h1>
            <p key="p" style={{ fontSize: 18 }}>
              感谢新媒提供的工作机会，让我真正的参与到了项目的开发中，了解了开发流程和业务逻辑，积累了许多有用
              的工作经验，技术上有了很大的提升，我怯懦、内向的性格和团队协作能力也有了很大的改善。
              <a href="//dir.mydearest.cn/summary/" target="_blank">
                40篇的周工作总结
              </a>
              也深受领导们的一致好评！{" "}
            </p>
          </QueueAnim>
          <TweenOne
            key="img"
            animation={{ x: "+=30", opacity: 0, type: "from" }}
            className={`${this.props.className}-img`}
          >
            <span>
              <img
                width="100%"
                src="http://dir.mydearest.cn/motion/image/component2.png"
              />
            </span>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

export default Content;
