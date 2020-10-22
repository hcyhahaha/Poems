import React from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"
import navstyle from "../css/nav.module.css";
import store from "../reducer.js";
import axios from 'axios';


class Nav extends React.Component {
    constructor(arg) {
        super(arg)
        this.state = {
            inputChange: "",
            login: store.getState()
        }
        this.click = function (e) {
            console.log(e.target);
            this.setState({ isShow: !this.state.isShow });
        }.bind(this);
        store.subscribe(() => {
            this.setState({ arr: store.getState() });
        })
        // this.goSearch = function () {
        //     // this.props.history.push("/search?user=haha")
        //     console.log(this.props.location);
        // }.bind(this);
        this.inputChange = function (e) {
            this.setState({ inputChange: e.target.value })
        }.bind(this);
        this.subSearch = function () {
            axios.get("http://10.55.58.252:7001/keydords",
                { params: { keydords: this.state.inputChange } })
                .then((res) => {
                    console.log(res.data);
                    var action = {
                        type: "searchArr",
                        value: res.data
                    };
                    store.dispatch(action)
                })
        }.bind(this);
    };
    render() {
        return (<div className={navstyle.nav}>
            <ul className={navstyle.ulFather}>
                <li><a href="javascript:void(0);">诗词网</a></li>
                <li style={{ borderBottom: this.state.login.style.isShow1 ? "3px solid white" : "3px solid transparent" }}><Link to="/">推荐</Link></li>
                <li style={{ borderBottom: this.state.login.style.isShow2 ? "3px solid white" : "3px solid transparent" }}><Link to="/poems">诗文</Link></li>
                <li style={{ borderBottom: this.state.login.style.isShow3 ? "3px solid white" : "3px solid transparent" }}><Link to="/dictum">名句</Link></li>
                <li style={{ borderBottom: this.state.login.style.isShow4 ? "3px solid white" : "3px solid transparent" }}><Link to="/author">作者</Link></li>
                <li style={{ borderBottom: this.state.login.style.isShow5 ? "3px solid white" : "3px solid transparent" }}><Link to="/square">创作</Link></li>
                <li>

                    <div className={navstyle.inputBox}>
                        <input onChange={(e) => { this.inputChange(e) }} type="text" placeholder="输入关键字搜索" />
                        <Link to="/poems" onClick={this.subSearch}>
                            <span className={navstyle.span1} onClick={this.goSearch}>
                                <svg t="1602599177554" className={navstyle.icon} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2321" width="20" height="20"><path d="M882.6369 904.308991 730.351542 708.192358c7.884574-6.656607 15.529695-13.647835 22.890336-21.0095 33.348526-33.350572 59.533908-72.194252 77.8296-115.453499 18.948561-44.803415 28.555359-92.378967 28.555359-141.40659 0-49.021483-9.607822-96.593965-28.556383-141.393287-18.295692-43.256176-44.481074-82.09781-77.828576-115.446335S681.053766 113.948215 637.797589 95.652524C592.99929 76.703963 545.429879 67.096141 496.409418 67.096141c-49.021483 0-96.593965 9.607822-141.394311 28.556383-43.256176 18.295692-82.098833 44.482097-115.446335 77.830623-33.348526 33.347502-59.533908 72.189136-77.830623 115.446335-18.948561 44.800345-28.556383 92.371804-28.556383 141.393287 0 49.027623 9.607822 96.603175 28.556383 141.40659 18.295692 43.259246 44.481074 82.10395 77.8296 115.453499 33.347502 33.349549 72.189136 59.536978 115.446335 77.833693 44.800345 18.948561 92.371804 28.556383 141.394311 28.556383 49.019437 0 96.590895-9.608845 141.389194-28.557406 12.920264-5.465478 25.436322-11.649318 37.541011-18.502399l154.415882 198.860117c11.339256 14.603603 31.987528 17.545608 46.119387 6.572696l1.705851-1.325182C891.713626 939.6458 893.977179 918.912593 882.6369 904.308991zM496.409418 732.173538c-166.428473 0-301.82928-135.410016-301.82928-301.851792 0-166.428473 135.399783-301.828256 301.82928-301.828256 166.423357 0 301.818023 135.399783 301.818023 301.828256C798.228465 596.763522 662.832775 732.173538 496.409418 732.173538z" p-id="2322"></path></svg>
                            </span>
                            <span className={navstyle.span2}></span>
                        </Link>
                    </div>

                </li>
                {/* <li><Link to="/search">搜索</Link></li> */}
                <li style={{ borderBottom: this.state.login.style.isShow6 ? "3px solid white" : "3px solid transparent" }}><Link to="/personal">我的</Link></li>
                <li style={{ borderBottom: this.state.login.style.isShow7 ? "3px solid white" : "3px solid transparent" }}><Link to="/related">相关</Link></li>
                <li style={{ borderBottom: this.state.login.style.isShow8 ? "3px solid white" : "3px solid transparent" }}>
                    <Link to="/login">{this.state.login.login} </Link>
                    <Link to="/register">注册</Link>
                </li>
            </ul>
        </div>);
    };
    componentDidMount() {
        // 如果登录过,就显示car,没有就重定向到其它页面去
        var isLogin = window.localStorage.getItem("isLogin")
        if (isLogin) {
            console.log("登陆过");
            store.dispatch({ type: "login", value: "已登录" });
        } else {
            // this.props.history.push("/login");
            // 重定向到登录页面
            console.log("没有登录过");
        }
    }
}

export default Nav;