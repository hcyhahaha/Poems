import React from 'react';
import { Redirect, Link } from "react-router-dom"
import Nav from '../Nav/Nav.jsx';
import axios from 'axios';
import store from "../reducer.js";
import personStyle from "./personal.module.css"
import "./personal.css"
import Button from '../Button/Button.jsx';
class Personal extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            arr: store.getState(),
            name: localStorage.getItem("nc"),
            collectionArr: [],
            uploadArr: [],
            // 标题输入框改变
            titleChange: "",
            // 内容输入框改变
            contentChange: "",
            // 内容区域的样式
            styleShow11: true,
            styleShow21: false,
            styleShow12: true,
            styleShow22: false,
            isActive1: true,
            isActive2: false,
            isShowContent: false
        }
        store.subscribe(() => {
            this.setState({ arr: store.getState() });
        })
        var data = {
            isShow1: false,
            isShow2: false,
            isShow3: false,
            isShow4: false,
            isShow5: false,
            isShow6: true,
            isShow7: false,
            isShow8: false
        }
        var action = {
            type: "style",
            value: data
        };
        store.dispatch(action)
        //1.请求我的收藏接口 我的作品接口
        if (localStorage.getItem("isLogin")) {
            axios.get("http://10.55.58.252:7001/getcollectionProduction", { params: { userid: localStorage.getItem("userid") } })
                .then((res) => {
                    console.log("用户所有收藏诗集", res.data);
                    this.setState({ collectionArr: res.data });
                })

            axios.get("http://10.55.58.252:7001/getSelfProduction", { params: { userid: localStorage.getItem("userid") } })
                .then((res) => {
                    console.log("用户上传诗集", res.data);
                    this.setState({ uploadArr: res.data });
                })
        };
        this.btnChange = function () {
            this.setState({
                styleShow11: !this.state.styleShow11,
                styleShow21: !this.state.styleShow21,
                styleShow12: !this.state.styleShow12,
                styleShow22: !this.state.styleShow22,
                isActive1: !this.state.isActive1,
                isActive2: !this.state.isActive2,
            });
        }.bind(this);
        this.chuangzuo = function () {
            this.setState({
                isShowContent: true
            });
        }.bind(this);
        this.btn1 = function () {
            this.setState({
                isShowContent: false
            });
        }.bind(this);
        // 标题输入框改变
        this.titleChange = function (e) {
            this.setState({ titleChange: e.target.value })
        }.bind(this);
        // 内容输入框改变
        this.contentChange = function (e) {
            this.setState({ contentChange: e.target.value })
        }.bind(this);
        // 提交按钮
        this.tijiaoBtn = function () {
            // 1.判断是否登录
            // 2.若登录，请求上传接口
            if (localStorage.getItem("isLogin")) {
                var data = {
                    title: this.state.titleChange,
                    content: this.state.contentChange,
                    userid: localStorage.getItem("userid"),
                    nc: localStorage.getItem("nc")
                }
                axios.post("http://10.55.58.252:7001/uploadpoems", data)
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.code === 2006) {
                            alert("发表成功！");
                        } else {
                            alert("上传失败！");
                        }
                    })
                this.setState({
                    msg1: "",
                    msg2: ""
                })
            } else {
                alert("您还没有登录！");
                this.props.history.push("/login")
            }
        }.bind(this);
    };

    render() {
        return (
            <div>
                <Nav></Nav>
                <div className={personStyle.titleName}>
                    <div className={personStyle.personBox}>
                        <h1>{this.state.name} 个人中心</h1>
                        <span onClick={this.chuangzuo} className={personStyle.chuangzuo} title="快来创作吧！">
                            <svg t="1602949910044" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23766" width="25" height="25"><path d="M896 864a32 32 0 0 1 0 64H128a32 32 0 0 1 0-64z m-60.16-733.621333l15.093333 15.093333c45.866667 45.834667 45.866667 120.16 0 166.005333L418.794667 743.338667a160.192 160.192 0 0 1-78.122667 42.986666l-152.245333 34.197334c-23.84 5.365333-44.661333-16.853333-37.749334-40.288l43.338667-146.88a160.042667 160.042667 0 0 1 40.373333-67.925334l435.328-435.050666c45.866667-45.834667 120.245333-45.834667 166.112 0zM636.32 254.304L279.68 610.709333a96.021333 96.021333 0 0 0-24.213333 40.746667l-27.946667 94.656 99.093333-22.261333a96.117333 96.117333 0 0 0 46.869334-25.781334L726.933333 344.842667l-90.602666-90.538667z m78.698667-78.656l-33.397334 33.386667 90.602667 90.538666 33.386667-33.376a53.333333 53.333333 0 0 0 0-75.456l-15.093334-15.093333a53.408 53.408 0 0 0-75.498666 0z" fill="#126e82" p-id="23767"></path></svg>
                        </span>
                    </div>
                </div>
                <div style={{ display: this.state.isShowContent ? "block" : "none" }} className={personStyle.publishContent_father}>
                    <div className={personStyle.publishContent}><br />
                        <input className={personStyle.tijiaoTitle} onChange={this.titleChange} type="text" placeholder="标题" />
                        <textarea className={personStyle.tijiaocontent} onChange={this.contentChange} cols="60" rows="10" placeholder="内容"></textarea>
                        <div className={personStyle.tijiaoBtn}>
                            <button onClick={this.btn1} className={personStyle.btn1}>隐藏</button>
                            <button className={personStyle.btn2} onClick={this.tijiaoBtn}>提交</button>
                        </div>
                    </div>
                </div>
                <div className={personStyle.titleTag}>
                    <h2 style={{ transform: this.state.styleShow11 ? "translateX(250px)" : "none" }} className={this.state.isActive1 ? "myshoucang1" : "myshoucang2"} onClick={this.btnChange}>我的收藏</h2>
                    <h2 style={{ transform: this.state.styleShow21 ? "translateX(-250px)" : "none" }} className={this.state.isActive2 ? "myshoucang1" : "myshoucang2"} onClick={this.btnChange}>我的发表</h2>
                </div>
                <div className={personStyle.selfBox}>
                    <div style={{ display: this.state.styleShow12 ? "block" : "none" }} className={personStyle.myCollection}>
                        {
                            this.state.collectionArr.map((el, index) => {
                                return (<div className={personStyle.content1}>
                                    <h1 className={personStyle.title}>{el.title}</h1>
                                    <div className={personStyle.dynAut}>
                                        <span>{el.dynasty} </span>
                                        <span>{el.author}</span>
                                    </div>
                                    <p className={personStyle.text}>{el.content}</p>
                                </div>)
                            })
                        }

                    </div>
                    <div style={{ display: this.state.styleShow22 ? "block" : "none" }} className={personStyle.myPublish}>
                        {
                            this.state.uploadArr.map((el, index) => {
                                return (<div className={personStyle.content2}>
                                    <h1 className={personStyle.title}>{el.title}</h1>
                                    <div className={personStyle.dynAut}>
                                        <span>现代 </span>
                                        <span>{this.state.name}</span>
                                    </div>
                                    <p className={personStyle.text}>{el.content}</p>
                                </div>)
                            })
                        }
                    </div>
                </div>
                <Button></Button>
            </div>
        )
    };
}

export default Personal;