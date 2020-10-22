import React from 'react';
import Nav from '../Nav/Nav.jsx';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"
import homestyle from "../css/home.module.css";
import store from "../reducer.js";
import axios from 'axios';
import Mypoems from "./poems.jsx";
import Button from '../Button/Button.jsx';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import "./pagination.css";
import Left from '../Left/Left.jsx';
import Right from '../Right/Right.jsx';
import Mydiv from '../Mydiv/Mydiv.jsx';


class Home extends React.Component {
    constructor(arg) {
        super(arg)
        // this.state = store.getState();
        this.state = {
            arr: store.getState(),
            total: "",
        }
        store.subscribe(() => {
            this.setState({ arr: store.getState() });
        })
        var data = {
            isShow1: true,
            isShow2: false,
            isShow3: false,
            isShow4: false,
            isShow5: false,
            isShow6: false,
            isShow7: false,
            isShow8: false
        }
        var action = {
            type: "style",
            value: data
        };
        store.dispatch(action)
    };

    render() {
        return (<div className={homestyle.home}>
            <Mydiv></Mydiv>
            <Nav></Nav>
            {/* <Left></Left>
            <Right></Right> */}
            {this.state.arr.arrfenye.map((el, index) => <Mypoems index={index} key={el.id} id={el.id} history={this.props.history} />)}
            {this.state.arr.msg}
            <Pagination
                defaultCurrent={1}
                total={this.state.total}
                showTotal={total => `共有 ${total} 条`}
                onChange={this.onChange}
            />
            <div style={{ height: "120px" }}></div>
            <Button></Button>

        </div>)
    };
    componentDidMount() {
        axios.get("http://10.55.58.252:7001/poems")
            .then((res) => {
                console.log("所有诗", res.data);
                var action = {
                    type: "arr",
                    value: res.data
                };
                store.dispatch(action)
                this.setState({
                    total: res.data.length,
                }, () => {
                    var action = {
                        type: "arrfenye",
                        value: this.state.arr.arr.slice(0, 10)
                    };
                    store.dispatch(action)
                })
            })

        // 点击分页时  每页10条数据
        this.onChange = function (page, pageSize) {
            console.log(page, pageSize);
            // this.data2 = this.data1.slice(e * 12 + 1 - 12, e * 12 + 1);
            var newpoems = this.state.arr.arr.slice(page * 10 - 10, page * 10)
            console.log("newpoems", newpoems);
            var action = {
                type: "arrfenye",
                value: newpoems
            };
            store.dispatch(action)
            var action = {
                type: "msg",
                value: page
            };
            store.dispatch(action)
        }.bind(this);
    }
}

export default Home;