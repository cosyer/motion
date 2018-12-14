import React from 'react';
import ReactDOM from 'react-dom';
import Point from './Point'
import { scrollScreen} from 'rc-scroll-anim';

import Content0 from './Content0';
import Content1 from './Content1';
import Content2 from './Content2';
import Content3 from './Content3';
import Content4 from './Content4';
import Footer from './Footer';
import './less/antMotion_style.less';

export default class Home extends React.Component {
  componentDidMount() {
    //  实现整屏滚动
    // const docHeight = ReactDOM.findDOMNode(this).getBoundingClientRect().height;
    // scrollScreen.init({ docHeight });
    // 点的位置居中
    const list = ReactDOM.findDOMNode(this.refs.list);
    const listHeight = list.getBoundingClientRect().height;
    list.style.marginTop = ` -${listHeight / 2}px`;
  }

  render() {
    const children = [
      <Content0 id="Content0" key="Content0"/>,
      <Content1 id="Content1" key="Content1"/>,
      <Content2 id="Content2" key="Content2"/>,
      <Content3 id="Content3" key="Content3"/>,
      <Content4 id="Content4" key="Content4"/>,
      <Footer id="Footer" key="Footer"/>,
      <Point key="list" ref="list" data={['Content0', 'Content1', 'Content2', 'Content3' ,'Content4','Footer']} />,
    ];
    return (
      <div className="templates-wrapper">
        {children}
      </div>
    );
  }
}
