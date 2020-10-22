import React from 'react';
import store from "../reducer.js";
import poemsStyle from "./poems.module.css";
import axios from 'axios';

class poems extends React.Component {
    constructor(arg) {
        super(arg)
        this.state = {
            arr: store.getState(),
            showElem1: true,
            showElem2: false
        }
        store.subscribe(() => {
            this.setState({ arr: store.getState() });
        })
        if (localStorage.getItem("isLogin")) {
            axios.get("http://10.55.58.252:7001/getcollectionProduction", { params: { userid: localStorage.getItem("userid") } })
                .then((res) => {
                    console.log("用户所有收藏诗集", res.data);
                    for (var i = 0; i < res.data.length; i++) {
                        console.log("序号呢", this.props.id);
                        if (this.props.id === res.data[i].id) {
                            console.log(res.data[i]);
                            this.setState({
                                showElem1: false,
                                showElem2: true,
                            })
                        }
                    }
                })
        }
        // 点击收藏时
        // 1.判断是否登录
        // 2.如果已经收藏，再点击则取消收藏
        this.collection = function (e, id) {
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
            <div className={poemsStyle.content}>
                <h1 className={poemsStyle.title}>{this.state.arr.arrfenye[this.props.index].title}</h1>
                <div className={poemsStyle.dynAut}>
                    <span className={poemsStyle.dynasty}>{this.state.arr.arrfenye[this.props.index].dynasty} </span>
                    <span className={poemsStyle.author}>{this.state.arr.arrfenye[this.props.index].author}</span>
                </div>
                <p className={poemsStyle.text}>{this.state.arr.arrfenye[this.props.index].content}</p>
                <span onClick={(e) => { this.collection(e, this.state.arr.arrfenye[this.props.index].id) }}>
                    {
                        this.state.showElem1 ? (
                            <svg t="1602827569051" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3141" width="20" height="20"><path d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z m0 63.146667c-41.44 0-70.261333 15.189333-116.96 55.04-2.165333 1.845333-14.4 12.373333-17.941334 15.381333a32.32 32.32 0 0 1-41.770666 0c-3.541333-3.018667-15.776-13.536-17.941334-15.381333-46.698667-39.850667-75.52-55.04-116.96-55.04C230.186667 180.48 149.333333 281.258667 149.333333 426.698667 149.333333 537.6 262.858667 675.242667 493.632 834.826667a32.352 32.352 0 0 0 36.736 0C761.141333 675.253333 874.666667 537.6 874.666667 426.698667c0-145.44-80.853333-246.218667-206.88-246.218667z" p-id="3142"></path></svg>
                        ) : null
                    }
                    {
                        this.state.showElem2 ? (
                            <svg style={{ fill: 'currentColor', color: '#c56183' }} t="1602827709905" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3479" width="20" height="20"><path d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z" p-id="3480"></path></svg>
                        ) : null
                    }

                </span>
            </div>

        )
    }
}
export default poems;