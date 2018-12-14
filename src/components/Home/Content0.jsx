import React, { PropTypes } from "react";
import Button from "antd/lib/button";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import BannerAnim, { Element } from "rc-banner-anim";
import Icon from "antd/lib/icon";
import "rc-banner-anim/assets/index.css";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";

const BgElement = Element.BgElement;
class Banner extends React.Component {
  render() {
    const childrenData = [
      {
        children: {
          title: { children: "http://dir.mydearest.cn/motion/image/font.png" },
          content: { children: "鱼跃此时海，花开彼岸天。" },
          button: { children: "Let’s start" }
        }
      },
      {
        children: {
          title: { children: "http://dir.mydearest.cn/motion/image/font.png" },
          content: { children: "鱼跃此时海，花开彼岸天。" },
          button: { children: "Let’s start" }
        }
      }
    ];
    const defaultImg = [
      "https://zos.alipayobjects.com/rmsportal/xHxWkcvaIcuAdQl.jpg",
      "http://dir.mydearest.cn/motion/image/banner2.jpg"
    ];
    const childrenToRender = childrenData.map((item, i) => {
      const children = item.children;
      const isImg = children.title.children.match(
        /\.(gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/
      );
      return (
        <Element key={i} prefixCls="banner-user-elem">
          <BgElement
            className="bg"
            key="bg"
            style={
              (children.bg && children.bg.style) || {
                backgroundImage: `url(${defaultImg[i]})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }
            }
          />
          <QueueAnim
            type={["bottom", "top"]}
            delay={200}
            className={`${this.props.className}-title`}
            key="text"
            style={children.wrapper && children.wrapper.style}
          >
            <span className="logo" key="logo" style={children.title.style}>
              {isImg ? (
                <img width="100%" src={children.title.children} />
              ) : (
                children.title.children
              )}
            </span>
            <p key="content" style={children.content.style}>
              {children.content.children}
            </p>
            <Button
              type="ghost"
              key="button"
              style={children.button.style}
              onClick={() => {
                document.getElementById("Content4").scrollIntoView();
              }}
            >
              {children.button.children}
            </Button>
          </QueueAnim>
        </Element>
      );
    });
    return (
      <TweenOne animation={{ opacity: 0, type: "from" }}>
        <OverPack {...this.props} hideProps={{ icon: { reverse: true } }}>
          <BannerAnim key="banner">{childrenToRender}</BannerAnim>
          <TweenOne
            animation={{ y: "-=20", yoyo: true, repeat: -1, duration: 1000 }}
            className={`${this.props.className}-icon`}
            style={{ bottom: 40 }}
            key="icon"
          >
            <Icon type="down" />
          </TweenOne>
        </OverPack>
      </TweenOne>
    );
  }
}

Banner.propTypes = {
  className: PropTypes.string
};

Banner.defaultProps = {
  className: "banner1"
};

export default Banner;
