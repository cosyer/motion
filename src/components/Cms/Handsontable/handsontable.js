import React from "react";
import ReactDOM from "react-dom";
import { Radio, message } from "antd";
import Handsontable from "../../../../node_modules/handsontable/dist/handsontable.full";
export default class Handsontable1 extends React.Component {
  // static propTypes = {
  //   actions: PropTypes.object.isRequired,
  //   data: PropTypes.object.isRequired
  // }
  constructor(props) {
    super(props);
    this.state = {
      data: [
        ["3vjJdX7R", "鄂Q2DY79", 50, 30, 4],
        ["WwDcEldv", "冀D98998", 45, 56, 3],
        ["rFEXJ2Kk", "豫J63569", 30, 34, 3],
        ["KcsLL6O6", "京AF2336", 28, 32, 3],
        ["eNk5r8gK", "京AF2332", 60, 12, 2],
        ["ca60L4zf", "渝A00001", 36, 13, 1],
        ["l4TGU4Xi", "渝A00002", 33, 34, 1],
        ["VXGRAmKt", "渝A00003", 30, 23, 3],
        ["tFy50Ene", "渝A00004", 45, 12, 4],
        ["zl8PwkqK", "渝A00005", 70, 22, 6]
      ],
      objectData: [
        { id: "3vjJdX7R", car_no: "鄂Q2DY79", detail: 50, money: 30, judge: 4 },
        { id: "WwDcEldv", car_no: "冀D98998", detail: 45, money: 56, judge: 3 },
        { id: "rFEXJ2Kk", car_no: "豫J63569", detail: 30, money: 34, judge: 3 },
        { id: "KcsLL6O6", car_no: "京AF2336", detail: 28, money: 32, judge: 3 },
        { id: "eNk5r8gK", car_no: "京AF2332", detail: 60, money: 12, judge: 2 },
        { id: "ca60L4zf", car_no: "渝A00001", detail: 36, money: 13, judge: 1 },
        { id: "l4TGU4Xi", car_no: "渝A00002", detail: 33, money: 34, judge: 1 },
        { id: "VXGRAmKt", car_no: "渝A00003", detail: 30, money: 23, judge: 3 },
        { id: "tFy50Ene", car_no: "渝A00004", detail: 45, money: 12, judge: 4 },
        { id: "zl8PwkqK", car_no: "渝A00005", detail: 70, money: 22, judge: 6 }
      ],
      rowNum: "",
      columnNum: "11111"
    };
  }
  onHotDataChange = changes => {
    console.log(changes);
    this.props.actions.changeHotData(changes);
  };
  //清空
  onClear = () => {
    this.state.hot.clear();
  };
  //加载
  onLoad = () => {
    // ajax('scripts/json/load.json', 'GET', '', function(res) {
    //  var data = JSON.parse(res.response);
    console.log(this.state.hot);

    console.log(this.props.htData);
    this.state.hot.loadData(this.props.htData);
    message.success("加载成功");
    var col = this.state.hot.countCols();
    this.setState({ columnNum: col }, function() {
      console.log("=====>", this.state.columnNum);
    });
    console.log("----->", this.state.columnNum);
    message.info("总列数" + this.state.columnNum);
  };
  //保存
  onSave = () => {
    console.log(this.state.hot.getData());
  };
  onChange = (change, source) => {
    console.log(change);
    console.log(source);
  };
  //复制
  onCopy = () => {
    console.log(this.state.hot.setCopyable("asdasd"));
  };
  componentDidMount() {
    let container = ReactDOM.findDOMNode(this.refs.table);
    let hot = new Handsontable(container, {
      rowHeaders: true,
      colHeaders: ["标识", "车牌号", "订单数", "金额", "评级"],
      columnSorting: true,
      manualColumnResize: true,
      manualRowResize: true,
      contextMenu: true,
      manualColumnMove: true,
      mergeCells: true,
      copyPaste: true,
      comments: true,
      afterChange: this.onChange
    });

    console.log(hot.getPlugin("ContextMenuCopyPaste"));

    this.setState({
      hot
    });
    console.log("hot===>", hot);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.state.hot.destroy();
  }

  render() {
    return (
      <div>
        <Radio.Group>
          <Radio.Button value="large" onClick={this.onLoad}>
            加载
          </Radio.Button>
          <Radio.Button value="large" onClick={this.onClear}>
            清空
          </Radio.Button>
          <Radio.Button value="large" onClick={this.onSave}>
            保存
          </Radio.Button>
          <Radio.Button value="large" onClick={this.onCopy}>
            复制
          </Radio.Button>
        </Radio.Group>
        {this.state.columnNum}
        <div
          ref="table"
          style={{ marginTop: 10 }}
          onChange={this.onHotDataChange}
        />
      </div>
    );
  }
}
