import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

class Content extends React.Component {

  static propTypes = {
    id: React.PropTypes.string,
  };

  static defaultProps = {
    className: 'content2',
  };

  getDelay = e => e.index % 3 * 100 + Math.floor(e.index / 3) * 100 + 200;

  render() {
    const blockArray = [
      { children: { icon: { children: 'http://dir.mydearest.cn/motion/image/html5.png' }, title: { children: 'HTML5' }, content: { children: '基于React的前端应用框架，开发和服务于企业级后台产品。' } } },
      { children: { icon: { children: 'http://dir.mydearest.cn/motion/image/css3.png' }, title: { children: 'CSS3' }, content: { children: 'CSS3' } } },
      { children: { icon: { children: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg' }, title: { children: 'ANT DESIGN' }, content: { children: '基于React的前端应用框架，开发和服务于企业级后台产品。' } } },
      { children: { icon: { children: 'http://dir.mydearest.cn/motion/image/java.png' }, title: { children: 'JAVA' }, content: { children: 'JAVA' } } },
      { children: { icon: { children: 'http://dir.mydearest.cn/motion/image/js.png' }, title: { children: 'JS' }, content: { children: 'JS' } } },
      { children: { icon: { children: 'http://dir.mydearest.cn/motion/image/mysql.png' }, title: { children: 'MySQL' }, content: { children: 'MySQL' } } },
    ];
    const children = blockArray.map((item, i) => {
      const children = item.children;
      const styleObj = item.style || {};
      return (<li
        key={i}
        style={{ left: `${i % 3 * 33.33}%`, top: `${Math.floor(i / 3) * 200}px`, ...styleObj }}
      >
        <TweenOne
          animation={{ x: '-=10', opacity: 0, type: 'from' }}
          className="img"
          key="img"
          style={children.icon.style}
        >
          <img src={children.icon.children} width="100%" />
        </TweenOne>
        <QueueAnim delay={100} leaveReverse key="text" className="text">
          <h1 key="h1" style={children.title.style}>{children.title.children}</h1>
          <p key="p" style={children.content.style}>{children.content.children}</p>
        </QueueAnim>
      </li>);
    });
    const titleAnim = { y: '+=30', opacity: 0, type: 'from' };
    return (
      <div
        {...this.props}
        className="content-template-wrapper"
      >
        <OverPack
          className={`content-template ${this.props.className}`}
          hideProps={{ h1: { reverse: true }, p: { reverse: true } }}
          location={this.props.id}
        >
          <TweenOne
            key="h1"
            animation={titleAnim}
            component="h1"
          >
            技能栈
          </TweenOne>
          <TweenOne
            key="p"
            animation={titleAnim}
            component="p"
          >
            目前我所掌握的技能
          </TweenOne>
          <QueueAnim
            key="ul"
            component="ul"
            leaveReverse
            type="bottom"
            interval={0}
            delay={this.getDelay}
          >
            {children}
          </QueueAnim>
        </OverPack>
      </div>
    );
  }
}


export default Content;
