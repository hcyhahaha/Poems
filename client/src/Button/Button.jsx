import React from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"
import store from "../reducer.js";
import axios from 'axios';
import buttonStyle from "./button.module.css";

class Button extends React.Component {
    constructor(arg) {
        super(arg)
        this.state = {
            title: ["网站地图", "相关链接", "影响授权", "隐私政策", "版权声明", "在线咨询", "联系我们", "关于我们",],
            wangzhan: ["网站维护：诗词网资料信息部", "联系方式：hufhufgdhndn@123.com",],
            jing: ["京公网安备 11010102004165号", "京ICP备05067311号-1"],
            last: ["@2001-现在 诗词网", "网站建设：不吃鱼的猫"],
            imgsrc: "https://img.dpm.org.cn/Public/static/ico.png",
        }
    }
    render() {
        return (<div className={buttonStyle.bottombox}>
            <ul className={buttonStyle.buttomBox1}>
                {this.state.title.map((el, index) => {
                    return (<li key={index}>{el}</li>)
                })}
            </ul>
            <ul className={buttonStyle.buttomBox2}>
                {this.state.wangzhan.map((el, index) => {
                    return (<li key={index}>{el}</li>)
                })}
            </ul>
            <ul className={buttonStyle.buttomBox3}>
                <img src={this.state.imgsrc} style={{ verticalAlign: "middle" }} />
                {this.state.jing.map((el, index) => {
                    return (<li key={index}>{el}</li>)
                })}
            </ul>
            <ul className={buttonStyle.buttomBox4}>
                {this.state.last.map((el, index) => {
                    return (<li key={index}>{el}</li>)
                })}
            </ul>
        </div>)
    }
}
export default Button;