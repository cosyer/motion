import React from 'react';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

class Content extends React.Component {

  static propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
  };

  static defaultProps = {
    className: 'content4',
  };

  getChildrenToRender = data =>
    data.map((item, i) => {
      const children = item.children;
      return (<li
        key={i}
        style={item.style}
      >
        <a className="content-wrapper" style={children.wrapper && children.wrapper.style} href={children.content.url} target="_blank">
            <span style={children.img.style}>
              <img src={children.img.children} height="100%" />
            </span>
          <p style={children.content.style}>
            {children.content.children}
          </p>
        </a>
      </li>);
    });

  getEnterAnim = (e) => {
    const index = e.index;
    const delay = index % 4 * 100 + Math.floor(index / 4) * 100 + 300;
    return { y: '+=30', opacity: 0, type: 'from', delay };
  };

  render() {
    const dataArray = [
      { children: { img: { children: 'http://img.mabylove.cn/rootImg/webpicture/application/growup300.png' }, content: { children: '渝商EDP微信端',url:'http://wx.edp.usumeco.com/'} } },
      { children: { img: { children: 'http://img.mabylove.cn/rootImg/webpicture/application/displayproduct300.png' }, content: { children: '渝商门户网站',url:'http://www.usumeco.com/' } } },
      { children: { img: { children: 'http://img.mabylove.cn/rootImg/webpicture/application/platform300.png' }, content: { children: '响应式页面',url:'http://dir.mydearest.cn/responsive/'} } },
      { children: { img: { children: 'http://img.mabylove.cn/rootImg/webpicture/application/ourself300.png' }, content: { children: 'fullPage练习',url:'http://dir.mydearest.cn/fullPage/' } } },
      { children: { img: { children: 'http://img.mabylove.cn/rootImg/webpicture/application/technologyshare300.png' }, content: { children: 'bootstrap版的个人简历',url:'http://dir.mydearest.cn/myself1/' } } },
      { children: { img: { children: 'http://img.mabylove.cn/rootImg/webpicture/application/diyweb300.png' }, content: { children: 'ant motion' } } },
      { children: { img: { children: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg' }, content: { children: 'ant design' } } },
      { children: { img: { children: 'https://os.alipayobjects.com/rmsportal/IwAqwmFOJJVHsBY.svg' }, content: { children: 'ant motion' } } },
    ];
    const childrenToRender = this.getChildrenToRender(dataArray);
    return (
      <div
        {...this.props}
        className="content-template-wrapper content4-wrapper"
      >
        <OverPack
          className={`content-template ${this.props.className}`}
          hideProps={{ h1: { reverse: true }, p: { reverse: true } }}
          location={this.props.id}
        >
          <TweenOne
            animation={{ y: '+=30', opacity: 0, type: 'from' }}
            component="h1"
            key="h1"
            reverseDelay={300}
          >
            项目案例
          </TweenOne>
          <TweenOne
            animation={{ y: '+=30', opacity: 0, type: 'from', delay: 200 }}
            component="p"
            key="p"
            reverseDelay={200}
          >
            这里介绍所参与过的项目
          </TweenOne>
          <TweenOneGroup
            className={`${this.props.className}-img-wrapper`}
            component="ul"
            key="ul"
            enter={this.getEnterAnim}
            leave={{ y: '+=30', opacity: 0 }}
          >
            {childrenToRender}
          </TweenOneGroup>
        </OverPack>
      </div>
    );
  }
}


export default Content;
