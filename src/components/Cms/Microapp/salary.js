import React from "react";
import { Input, Row, Col } from "antd";

let handleonce = true;

/* 工资计算器组件 */
export default class Salary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      old: "",
      medical: "",
      offwork: "",
      house: "",
      pretax: "",
      tax: "",
      output: ""
    };
  }

  handleChange = e => {
    let input = e.target.value;
    if (handleonce && input >= 10000) {
      handleonce = false;
      alert("呦！不错哦，工资上万了");
    }
    let old = (input * 8) / 100;
    let medical = (input * 2) / 100 + (input > 0 ? 3 : 0);
    let offwork = (input * 2) / 1000;
    let house = (input * 12) / 100;
    let pretax = input - old - medical - offwork - house;
    let taxBase = pretax - 3500;
    let tax;
    if (taxBase <= 0) {
      tax = 0;
    } else if (taxBase > 0 && taxBase <= 1500) {
      tax = (taxBase * 3) / 100;
    } else if (taxBase > 1500 && taxBase <= 4500) {
      tax = (taxBase * 10) / 100 - 105;
    } else if (taxBase > 4500 && taxBase <= 9000) {
      tax = (taxBase * 20) / 100 - 555;
    } else if (taxBase > 9000 && taxBase <= 35000) {
      tax = (taxBase * 25) / 100 - 1005;
    } else if (taxBase > 35000 && taxBase <= 55000) {
      tax = (taxBase * 30) / 100 - 2775;
    } else if (taxBase > 55000 && taxBase <= 80000) {
      tax = (taxBase * 35) / 100 - 5505;
    } else if (taxBase > 80000) {
      tax = (taxBase * 45) / 100 - 13505;
    }
    let cleanTax = tax.toFixed(2);
    let output = (pretax - tax).toFixed(2);

    this.setState({
      old: old,
      medical: medical,
      offwork: offwork,
      house: house,
      pretax: pretax,
      tax: cleanTax,
      output: output
    });
  };

  render() {
    return (
      <div style={{ marginTop: 60 }}>
        <Row
          type="flex"
          justify="center"
          className="rowItem"
          style={{ marginTop: 10 }}
        >
          <Col span={10}>
            <Input
              type="number"
              addonBefore="应发工资："
              addonAfter="￥"
              onChange={this.handleChange}
            />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          className="rowItem"
          style={{ marginTop: 10 }}
        >
          <Col span={10}>
            <Input
              addonBefore="养老保险："
              addonAfter="￥"
              value={this.state.old}
            />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          className="rowItem"
          style={{ marginTop: 10 }}
        >
          <Col span={10}>
            <Input
              addonBefore="医疗保险："
              addonAfter="￥"
              value={this.state.medical}
            />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          className="rowItem"
          style={{ marginTop: 10 }}
        >
          <Col span={10}>
            <Input
              addonBefore="失业保险："
              addonAfter="￥"
              value={this.state.offwork}
            />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          className="rowItem"
          style={{ marginTop: 10 }}
        >
          <Col span={10}>
            <Input
              addonBefore="住房公积："
              addonAfter="￥"
              value={this.state.house}
            />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          className="rowItem"
          style={{ marginTop: 10 }}
        >
          <Col span={10}>
            <Input
              addonBefore="税前工资："
              addonAfter="￥"
              value={this.state.pretax}
              id="red"
            />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          className="rowItem"
          style={{ marginTop: 10 }}
        >
          <Col span={10}>
            <Input
              addonBefore="个人税收："
              addonAfter="￥"
              value={this.state.tax}
            />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          className="rowItem"
          style={{ marginTop: 10 }}
        >
          <Col span={10}>
            <Input
              addonBefore="税后工资："
              addonAfter="￥"
              value={this.state.output}
              id="blue"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
