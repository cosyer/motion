import React from "react";
import QueueAnim from "rc-queue-anim";
import TweenOne, { TweenOneGroup } from "rc-tween-one";
import { Icon, Select, Switch, Modal } from "antd";
import classNames from "classnames";
import styles from "./game.less";
// 伪全局变化时不会重新渲染(性能?)
const Option = Select.Option;
const showImage = ({
  picOpen,
  projectList,
  dataArray,
  state,
  storePicOpen,
  handleChange,
  previewVisible,
  previewImage,
  handlePreview,
  handleCancel,
  changeState,
  prePic,
  nextPic
}) => {
  // console.log(picOpen)
  function onImgClick(e, i) {
    Object.keys(picOpen).forEach(key => {
      if (key !== i && picOpen[key]) {
        picOpen[key] = false;
      }
    });
    if (picOpen[i] == false) {
    } else picOpen[i] = true;
    storePicOpen(picOpen);
    loop();
  }
  function onClose(e, i) {
    picOpen[i] = false;
    storePicOpen(picOpen);
  }
  function onTweenEnd(i) {
    delete picOpen[i];
    storePicOpen(picOpen);
  }
  function getDelay(e) {
    const i = e.index + (dataArray.length % 4);
    return (i % 4) * 100 + Math.floor(i / 4) * 100 + 200;
  }
  const loop = () => {
    const imgWidth = 110;
    const imgHeight = 76;
    const imgBoxWidth = 130;
    const imgBoxHeight = 96;
    return dataArray.map((item, i) => {
      const { image, title, content } = item;
      const isEnter = typeof picOpen[i] === "boolean";
      const isOpen = picOpen[i];
      const left = isEnter ? 0 : imgBoxWidth * (i % 4);
      const imgLeft = isEnter ? imgBoxWidth * (i % 4) : 0;
      const isRight = Math.floor((i % 4) / 2);
      const isTop = Math.floor(i / 4);
      let top = isTop ? (isTop - 1) * imgBoxHeight : 0;
      top = isEnter ? top : imgBoxHeight * isTop;
      let imgTop = isTop ? imgBoxHeight : 0;
      imgTop = isEnter ? imgTop : 0;

      const liStyle = isEnter
        ? { width: "100%", height: 175, zIndex: 1 }
        : null;
      const liAnimation = isOpen
        ? { boxShadow: "0 2px 8px rgba(140, 140, 140, .35)" }
        : { boxShadow: "0 0px 0px rgba(140, 140, 140, 0)" };
      let aAnimation = isEnter
        ? {
            delay: 400,
            ease: "easeInOutCubic",
            width: imgWidth,
            height: imgHeight,
            onComplete: onTweenEnd.bind(this, i),
            left: imgBoxWidth * (i % 4),
            top: isTop ? imgBoxHeight : 0
          }
        : null;
      aAnimation = isOpen
        ? {
            ease: "easeInOutCubic",
            left: isRight ? imgBoxWidth * 2 - 10 : 0,
            width: "50%",
            height: 175,
            top: 0
          }
        : aAnimation;

      // 位置 js 控制；
      return (
        <TweenOne
          key={i}
          style={{
            left,
            top,
            ...liStyle
          }}
          component="li"
          className={isOpen ? "open" : ""}
          animation={liAnimation}
        >
          <TweenOne
            component="a"
            onClick={
              state ? () => handlePreview({ image }) : e => onImgClick(e, i)
            }
            style={{
              left: imgLeft,
              top: imgTop
            }}
            animation={aAnimation}
          >
            <img src={image} width="100%" height="100%" />
          </TweenOne>
          <TweenOneGroup
            enter={[
              { opacity: 0, duration: 0, type: "from", delay: 400 },
              {
                ease: "easeOutCubic",
                type: "from",
                left: isRight ? "50%" : "0%"
              }
            ]}
            leave={{ ease: "easeInOutCubic", left: isRight ? "50%" : "0%" }}
            component=""
          >
            {isOpen && (
              <div
                className="pic-details-demo-text-wrapper"
                key="text"
                style={{
                  left: isRight ? "0%" : "50%"
                }}
              >
                <h1>{title}</h1>
                <Icon type="cross" onClick={e => onClose(e, i)} />
                <em />
                <p>{content}</p>
              </div>
            )}
          </TweenOneGroup>
        </TweenOne>
      );
    });
  };
  const getLiChildren = loop();
  const projectData = projectList.map((item, index) => (
    <Option value={item.project_id} key={index}>
      {item.project_name}
    </Option>
  ));
  return (
    <div>
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={handleCancel}
        width="960"
      >
        <div className={styles.container}>
          <a
            onClick={prePic}
            className={classNames(styles.arrow, styles.arrow_left)}
          >
            &lt;
          </a>
          <a
            onClick={nextPic}
            className={classNames(styles.arrow, styles.arrow_right)}
          >
            &gt;
          </a>
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </div>
      </Modal>
      <div className={styles.selectStyle}>
        <Select
          style={{ width: 180 }}
          onChange={handleChange}
          showSearch
          allowClear
          placeholder="请选择项目@_@"
        >
          {projectData}
        </Select>
        <div className={styles.preview}>
          预览
          <Switch
            checkedChildren={"开"}
            unCheckedChildren={"关"}
            onChange={changeState}
          />
        </div>
      </div>
      <div className="pic-details-demo-wrapper">
        <div className="pic-details-demo">
          <div className="pic-details-demo-header">
            <ul>
              <li />
              <li />
              <li />
              <li />
              <li />
            </ul>
          </div>
          <QueueAnim type="bottom" className="pic-details-demo-title">
            <h1 key="h1">Project Description</h1>
            <p key="p">项目描述</p>
          </QueueAnim>
          <QueueAnim
            delay={getDelay}
            component="ul"
            className="pic-details-demo-image-wrapper"
            interval={0}
            type="bottom"
          >
            {getLiChildren}
          </QueueAnim>
        </div>
      </div>
    </div>
  );
};

showImage.propTypes = {};

export default showImage;
