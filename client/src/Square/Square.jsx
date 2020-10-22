import React from 'react';
import { Redirect } from "react-router-dom"
import Nav from '../Nav/Nav.jsx';
import store from "../reducer.js";
import axios from 'axios';
import squareStyle from "./square.module.css"
import Button from '../Button/Button.jsx';
class Square extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            getAllSelfPoems: [],
            isShow: false,
            show_commentArr: [],
            commenttext: "",
            poemsid: "",
            store: store.getState()
        }
        store.subscribe(() => {
            this.setState({ store: store.getState() });
        })
        var data = {
            isShow1: false,
            isShow2: false,
            isShow3: false,
            isShow4: false,
            isShow5: true,
            isShow6: false,
            isShow7: false,
            isShow8: false
        }
        var action = {
            type: "style",
            value: data
        };
        store.dispatch(action)
        // 请求所有的 用户自己写的诗 的接口
        axios.get("http://10.55.58.252:7001/getAllSelfPoems")
            .then((res) => {
                console.log("所有用户上传诗集", res.data);
                this.setState({ getAllSelfPoems: res.data });
            })
        // 点击评论图标
        this.commenticon = function (e, id) {
            // let span = e.target.parentElement.parentElement.nextSibling;
            // console.log(span.style.display);
            this.setState({ isShow: false, poemsid: id }, () => {
                console.log(this.state.poemsid);
            });
            // let span = e.target.parentElement.parentElement.nextSibling;
            // console.log(span.style);
            // console.log(this.state.isShow);
            // span.style.display = "block";
            axios.get("http://10.55.58.252:7001/getallcomments", { params: { poemsid: id } })
                .then((res) => {
                    console.log(res.data);
                    this.setState({ show_commentArr: res.data });

                })

        }.bind(this);
        // 点击隐藏 按钮
        this.btn_hide = function (e) {
            // let span = e.target.parentElement;
            // span.style.display = "none";
            this.setState({ poemsid: "" });
        }.bind(this);
        // 评论输入框
        this.commentChange = function (e) {
            this.setState({ commenttext: e.target.value })
        }.bind(this);
        // 提交评论
        this.btn_submitcomment = function (e, id) {
            if (localStorage.getItem("isLogin")) {
                axios.get("http://10.55.58.252:7001/setComments", {
                    params: {
                        userid: localStorage.getItem("userid"),
                        nc: localStorage.getItem("nc"),
                        poemsid: id,
                        comtext: this.state.commenttext
                    }
                })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.affectedRows > 0) {
                            alert("评论成功！")
                            axios.get("http://10.55.58.252:7001/getallcomments", { params: { poemsid: id } })
                                .then((res) => {
                                    console.log(res.data);
                                    this.setState({ show_commentArr: res.data });
                                })
                        } else {
                            alert("评论失败！")
                        }
                    })
            } else {
                alert("您还没有登录！");
                this.props.history.push("/login")
            }
        }.bind(this);
        //收藏与取消收藏
        this.collection = function (e, id) {
            console.log("yeyeyeyeey");
            if (localStorage.getItem("isLogin")) {
                if (this.state.showElem1) {//没有收藏
                    axios.get("http://10.55.58.252:7001/collectionProduction", { params: { poemid: id, userid: localStorage.getItem("userid") } })
                        .then((res) => {
                            console.log("收藏接口", res.data);
                            if (res.data.code === 2006) {
                                alert("收藏成功！");
                            }
                        });
                    this.setState({
                        showElem1: !this.state.showElem1,
                        showElem2: !this.state.showElem2,
                    })
                } else if (this.state.showElem2) {//已经收藏了
                    //请求取消收藏接口
                    axios.get("http://10.55.58.252:7001/cancelCollection", { params: { poemid: id, userid: localStorage.getItem("userid") } })
                        .then((res) => {
                            console.log("取消收藏接口", res.data);
                            if (res.data.code === 2006) {
                                alert("已取消收藏");
                            }
                        });
                    this.setState({
                        showElem1: !this.state.showElem1,
                        showElem2: !this.state.showElem2,
                    })
                }
            } else {
                this.props.history.push("/login")
            }
        }
    };

    render() {
        return (
            <div>
                <Nav></Nav>
                <div className={squareStyle.bgcimg} style={{
                    height: "100%",
                    width: "100%",
                    position: "fixed",
                    float: "left",
                }}>
                </div>
                {/* <h1>这是创作界面</h1> */}
                {
                    this.state.getAllSelfPoems.map((el, index) => {
                        return (<div className={squareStyle.content} key={el.id}>
                            <h1 className={squareStyle.title}>{el.title}</h1>
                            <div className={squareStyle.dynAut}>
                                <span>现代 </span>
                                <span>{el.nc}</span>
                            </div>
                            <p className={squareStyle.text}>{el.content}</p>
                            {/* 图标 */}
                            <span onClick={(e) => { this.collection(e, el.id) }}>
                                <span className={squareStyle.comment} onClick={(e) => { this.commenticon(e, el.id) }}>
                                    <svg t="1603082791156" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3624" width="20" height="20"><path d="M883.712 22.528H140.288C69.12 22.528 11.776 79.872 11.776 151.04v507.904c0 70.656 57.856 128.512 128.512 128.512h392.704l201.216 201.216c8.192 8.192 19.456 12.288 30.208 12.288 10.752 0 22.016-4.096 30.208-12.288 16.896-16.896 16.896-44.032 0-60.416l-205.312-205.312c-13.312-13.312-37.376-20.992-56.832-20.992H126.976c-23.552 0-36.864-18.944-36.864-43.008v-517.12c0-23.552 18.944-43.008 43.008-43.008h760.32c23.552 0 43.008 18.944 43.008 43.008v517.12c0 23.552-18.944 43.008-43.008 43.008h-106.496c-23.552 0-43.008 18.944-43.008 43.008 0 23.552 18.944 43.008 43.008 43.008h97.28c70.656 0 128.512-57.856 128.512-128.512V151.04c-0.512-70.656-58.368-128.512-129.024-128.512z" fill="#333333" p-id="3625"></path></svg>
                                </span>
                            </span>
                            {/* 评论 内容 */}
                            <div className={squareStyle.contentBox} style={{ display: this.state.poemsid === el.id ? "block" : "none" }}>
                                <button onClick={this.btn_hide} className={squareStyle.btn_hidden}>隐藏</button>
                                <div className={squareStyle.comment_input}>
                                    <input onChange={this.commentChange} type="text" />
                                    <button onClick={(e) => { this.btn_submitcomment(e, el.id) }}>评论</button>
                                </div>
                                <div>
                                    {
                                        this.state.show_commentArr.map((el, index) => {
                                            return (<div className={squareStyle.show_comment} key={index}>
                                                <span>{el.nc}：</span>
                                                <p>{el.comtext}</p>
                                            </div>)
                                        })
                                    }
                                </div>
                            </div>
                        </div>);
                    })
                }
                <div style={{ height: "120px" }}></div>
                <Button></Button>
            </div>
        )
    };
}

export default Square;