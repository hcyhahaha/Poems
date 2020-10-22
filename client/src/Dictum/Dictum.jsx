import React from 'react';
import { Redirect } from "react-router-dom"
import poemsStyle from "../Poems/poems.module.css"
import store from "../reducer.js";
import Nav from '../Nav/Nav.jsx';
import Showdictum from "./showdictum.jsx";
import axios from 'axios';
import Button from '../Button/Button';
class Dictum extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            searchTitle: "不限",
            arr: store.getState()
        }
        store.subscribe(() => {
            this.setState({ arr: store.getState() });
        })
        var data = {
            isShow1: false,
            isShow2: false,
            isShow3: true,
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
        // 搜索主题
        this.searchDictum = function (e) {
            console.log(e.target.innerHTML);
            this.setState({ searchTitle: e.target.innerHTML }, () => {
                console.log("测试", this.state);
                axios.get("http://10.55.58.252:7001/keydordsdictum",
                    { params: { keydords: this.state.searchTitle } })
                    .then((res) => {
                        console.log(res.data);
                        var action = {
                            type: "dictumArr",
                            value: res.data
                        };
                        store.dispatch(action)
                    })
            });
        }
    };

    render() {
        return (
            <div> <div className={poemsStyle.bgcimg} style={{
                height: "100%",
                width: "100%",
                position: "fixed",
                float: "left",
            }}>
            </div>

                <Nav></Nav>
                {/* 这是名句界面 */}
                <div className={poemsStyle.fbox}>
                    <div className={poemsStyle.searchType}>{this.state.searchTitle}</div>
                    <div className={poemsStyle.typebox}>
                        <div className={poemsStyle.type}>主题</div>
                        <ul className={poemsStyle.ulBox}>
                            <li onClick={(e) => { this.searchDictum(e) }}>抒情</li>
                            <li onClick={(e) => { this.searchDictum(e) }}>四季</li>
                            <li onClick={(e) => { this.searchDictum(e) }}>山水</li>
                            <li onClick={(e) => { this.searchDictum(e) }}>天气</li>
                            <li onClick={(e) => { this.searchDictum(e) }}>人物</li>
                            <li onClick={(e) => { this.searchDictum(e) }}>人生</li>
                            <li onClick={(e) => { this.searchDictum(e) }}>生活</li>
                            <li onClick={(e) => { this.searchDictum(e) }}>节日</li>
                            <li onClick={(e) => { this.searchDictum(e) }}>动物</li>
                            <li onClick={(e) => { this.searchDictum(e) }}>植物</li>
                            <li onClick={(e) => { this.searchDictum(e) }}>食物</li>
                            <li onClick={(e) => { this.searchDictum(e) }}>古籍</li>
                        </ul>
                    </div>
                </div>
                <div>
                    {this.state.arr.dictumArr.map((el, index) => <Showdictum index={index} key={index} history={this.props.history} />)}
                </div>
                <div style={{ height: "120px" }}></div>
                <Button></Button>
            </div>
        )
    };
    componentDidMount() {
        axios.get("http://10.55.58.252:7001/alldictum")
            .then((res) => {
                console.log(res.data);
                var action = {
                    type: "dictumArr",
                    value: res.data
                };
                store.dispatch(action)
            })
    }
}

export default Dictum;