import Axios from 'axios';
import React from 'react';
import { Redirect } from "react-router-dom"
import Nav from '../Nav/Nav.jsx';
import poemsStyle from "./poems.module.css"
import store from "../reducer.js";
import axios from 'axios';
import Showpoems from "./showpoems.jsx";
import Button from '../Button/Button.jsx';
class Poems extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            searchType: "不限",
            arr: store.getState()
        }
        store.subscribe(() => {
            this.setState({ arr: store.getState() });
        })
        var data = {
            isShow1: false,
            isShow2: true,
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
        // 搜索类型
        this.searchType = function (e) {
            console.log(e.target.innerHTML);
            this.setState({ searchType: e.target.innerHTML }, () => {
                console.log("测试", this.state);
                Axios.get("http://10.55.58.252:7001/keydordstype",
                    { params: { keydords: this.state.searchType } })
                    .then((res) => {
                        console.log(res.data);
                        var action = {
                            type: "searchArr",
                            value: res.data
                        };
                        store.dispatch(action)
                    })
            });
        }
        // 搜索作者
        this.searchAuthor = function (e) {
            console.log(e.target.innerHTML);
            this.setState({ searchType: e.target.innerHTML }, () => {
                console.log("测试", this.state);
                Axios.get("http://10.55.58.252:7001/keydordsauthor",
                    { params: { keydords: this.state.searchType } })
                    .then((res) => {
                        console.log(res.data);
                        var action = {
                            type: "searchArr",
                            value: res.data
                        };
                        store.dispatch(action)
                    })
            });
        }
        // 搜索朝代
        this.searchDynasty = function (e) {
            console.log(e.target.innerHTML);
            this.setState({ searchType: e.target.innerHTML }, () => {
                console.log("测试", this.state);
                Axios.get("http://10.55.58.252:7001/keydordsdynasty",
                    { params: { keydords: this.state.searchType } })
                    .then((res) => {
                        console.log(res.data);
                        var action = {
                            type: "searchArr",
                            value: res.data
                        };
                        store.dispatch(action)
                    })
            });
        }
        // 搜索形式
        this.searchFormality = function (e) {
            console.log(e.target.innerHTML);
            this.setState({ searchType: e.target.innerHTML }, () => {
                console.log("测试", this.state);
                Axios.get("http://10.55.58.252:7001/keydordsformality",
                    { params: { keydords: this.state.searchType } })
                    .then((res) => {
                        console.log(res.data);
                        var action = {
                            type: "searchArr",
                            value: res.data
                        };
                        store.dispatch(action)
                    })
            });
        }
    };

    render() {
        return (
            <div>
                <div className={poemsStyle.bgcimg} style={{
                    height: "100%",
                    width: "100%",
                    position: "fixed",
                    float: "left",
                }}>
                </div>
                <Nav></Nav>
                <div className={poemsStyle.fbox}>
                    <div className={poemsStyle.searchType}>{this.state.searchType}</div>
                    <div className={poemsStyle.countentbox}>
                        <div className={poemsStyle.type}>类型</div>
                        <ul className={poemsStyle.ulBox}>
                            <li onClick={(e) => { this.searchType(e) }}>写景</li>
                            <li onClick={(e) => { this.searchType(e) }}>咏物</li>
                            <li onClick={(e) => { this.searchType(e) }}>春天</li>
                            <li onClick={(e) => { this.searchType(e) }}>夏天</li>
                            <li onClick={(e) => { this.searchType(e) }}>秋天</li>
                            <li onClick={(e) => { this.searchType(e) }}>冬天</li>
                            <li onClick={(e) => { this.searchType(e) }}>写雪</li>
                            <li onClick={(e) => { this.searchType(e) }}>写雨</li>
                            <li onClick={(e) => { this.searchType(e) }}>写风</li>
                            <li onClick={(e) => { this.searchType(e) }}>写花</li>
                            <li onClick={(e) => { this.searchType(e) }}>梅花</li>
                            <li onClick={(e) => { this.searchType(e) }}>荷花</li>
                            <li onClick={(e) => { this.searchType(e) }}>菊花</li>
                            <li onClick={(e) => { this.searchType(e) }}>柳树</li>
                            <li onClick={(e) => { this.searchType(e) }}>月亮</li>
                            <li onClick={(e) => { this.searchType(e) }}>山水</li>
                            <li onClick={(e) => { this.searchType(e) }}>写山</li>
                            <li onClick={(e) => { this.searchType(e) }}>写水</li>
                            <li onClick={(e) => { this.searchType(e) }}>长江</li>
                            <li onClick={(e) => { this.searchType(e) }}>黄河</li>
                            <li onClick={(e) => { this.searchType(e) }}>忧国忧民</li>
                        </ul>
                    </div>
                    <div className={poemsStyle.countentbox}>
                        <div className={poemsStyle.type}>作者</div>
                        <ul className={poemsStyle.ulBox}>
                            <li onClick={(e) => { this.searchAuthor(e) }}>李白</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>杜甫</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>苏轼</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>王维</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>杜牧</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>陆游</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>李煜</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>元稹</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>韩愈</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>岑参</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>齐己</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>贾岛</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>柳永</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>曹操</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>李贺</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>曹植</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>张籍</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>孟郊</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>皎然</li>
                            <li onClick={(e) => { this.searchAuthor(e) }}>许浑</li>
                        </ul>
                    </div>
                    <div className={poemsStyle.typebox}>
                        <div className={poemsStyle.type}>朝代</div>
                        <ul className={poemsStyle.ulBox}>
                            <li onClick={(e) => { this.searchDynasty(e) }}>先秦</li>
                            <li onClick={(e) => { this.searchDynasty(e) }}>两汉</li>
                            <li onClick={(e) => { this.searchDynasty(e) }}>魏晋</li>
                            <li onClick={(e) => { this.searchDynasty(e) }}>南北朝</li>
                            <li onClick={(e) => { this.searchDynasty(e) }}>隋代</li>
                            <li onClick={(e) => { this.searchDynasty(e) }}>唐代</li>
                            <li onClick={(e) => { this.searchDynasty(e) }}>五代</li>
                            <li onClick={(e) => { this.searchDynasty(e) }}>宋代</li>
                            <li onClick={(e) => { this.searchDynasty(e) }}>金朝</li>
                            <li onClick={(e) => { this.searchDynasty(e) }}>元代</li>
                            <li onClick={(e) => { this.searchDynasty(e) }}>明代</li>
                            <li onClick={(e) => { this.searchDynasty(e) }}>清代</li>
                        </ul>
                    </div>
                    <div className={poemsStyle.xingshibox}>
                        <div className={poemsStyle.type}>形式</div>
                        <ul className={poemsStyle.ulBox}>
                            <li onClick={(e) => { this.searchFormality(e) }}>诗</li>
                            <li onClick={(e) => { this.searchFormality(e) }}>词</li>
                            <li onClick={(e) => { this.searchFormality(e) }}>曲</li>
                            <li onClick={(e) => { this.searchFormality(e) }}>文言文</li>
                        </ul>
                    </div>
                </div>
                <div>
                    {this.state.arr.searchArr.map((el, index) => <Showpoems index={index} key={index} />)}
                </div>
                <div style={{ height: "120px" }}></div>
                <Button></Button>
            </div>
        )
    };
    componentDidMount() {
        if (this.state.arr.searchArr[0]) {

        } else {
            axios.get("http://10.55.58.252:7001/poems")
                .then((res) => {
                    console.log("所有诗", res.data);
                    var action = {
                        type: "searchArr",
                        value: res.data
                    };
                    store.dispatch(action)
                })
        }
    }
}

export default Poems;