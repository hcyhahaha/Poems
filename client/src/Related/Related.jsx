import React from 'react';
import { Redirect } from "react-router-dom"
import Nav from '../Nav/Nav.jsx';
import axios from 'axios';
import store from "../reducer.js";
import Goods from "./Good.jsx";
import goodStyle from "./Good.module.css";
import Button from '../Button/Button.jsx';
class Related extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = store.getState();
        // 当store中的数据被更新了，会重新调用subscribe()
        store.subscribe(() => {
            this.setState(store.getState());
        })
        var data = {
            isShow1: false,
            isShow2: false,
            isShow3: false,
            isShow4: false,
            isShow5: false,
            isShow6: false,
            isShow7: true,
            isShow8: false
        }
        var action = {
            type: "style",
            value: data
        };
        store.dispatch(action)
    };

    render() {
        var totle = 0;
        for (var i = 0; i < this.state.cars.length; i++) {
            totle += this.state.cars[i].price * this.state.cars[i].count;
        }
        return (
            <div>
                <Nav></Nav>
                <div className={goodStyle.settlementdiv}>
                    <button className={goodStyle.settlement}>结算：{totle}</button>
                </div>
                <div className={goodStyle.box}>
                    {this.state.cars.map((el, index) => <Goods index={index} />)}
                </div>
                <Button></Button>
            </div>
        )
    };

    componentDidMount() {
        axios.get("http://10.55.58.252:7001/getcar")
            .then((res) => {
                // console.log(res.data);
                var action = {
                    type: "allcars",
                    value: res.data
                };
                store.dispatch(action)
            })
    };
}

export default Related;