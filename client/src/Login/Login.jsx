import React from 'react';
import { Redirect } from "react-router-dom"
import axios from 'axios';
import Nav from '../Nav/Nav.jsx';
import loginstyle from "../css/login.module.css";
import store from "../reducer.js";

class Login extends React.Component {
    constructor(arg) {
        super(arg);
        // console.log(store.getState());
        // console.log(this.props.location);
        this.state = {
            email: "",
            password: ""
        };
        this.state2 = store.getState();
        store.subscribe(() => {
            //单向的。如果仓库中数据更新了，要重新调用来获取新数据
            var data = store.getState();//{count:20}
            // console.log(data);
            this.setState(data);
        });
        var data = {
            isShow1: false,
            isShow2: false,
            isShow3: false,
            isShow4: false,
            isShow5: false,
            isShow6: false,
            isShow7: false,
            isShow8: true
        }
        var action = {
            type: "style",
            value: data
        };
        store.dispatch(action)
        this.emailChange = function (e) {
            // console.log(e.target.value);
            this.setState({ email: e.target.value })
        }.bind(this);

        this.passwordChange = function (e) {
            // console.log(e.target.value);
            this.setState({ password: e.target.value })
        }.bind(this);
        this.submit = function (e) {
            //获取用户交互结果
            // 表单验证
            // 触发提交
            // this.state.email
            // this.state.password
            // 别连调
            var data = {
                email: this.state.email,
                password: this.state.password
            }
            // console.log(data);{email: "567", password: "666"}
            axios.post("http://10.55.58.252:7001/login", data)
                .then((res) => {
                    console.log(res);
                    if (res.data.code === 2002) {
                        console.log("登录成功");
                        alert("登录成功");
                        localStorage.setItem("isLogin", true);
                        localStorage.setItem("userid", res.data.userid);
                        localStorage.setItem("nc", res.data.nc);
                        store.dispatch({ type: "login", value: "已登录" });
                        //更新数据，会调用reducer函数
                        this.props.history.push("/personal")
                    } if (res.data.code === 4003) {
                        console.log(res.data.info);
                    }
                })
        }.bind(this);
    };

    render() {
        return (
            <div>
                <Nav></Nav>
                <h1>这是登录界面</h1>
                <div className={loginstyle.box} >
                    <h1>登录</h1>
                    <input type="text" name="" onChange={this.emailChange} placeholder="输入您的账号"></input>
                    <input type="password" name="" onChange={this.passwordChange} placeholder="输入您的密码"></input>
                    <input onClick={this.submit} type="submit" name="" value="登录"></input>
                </div>
            </div>
        )
    };

    componentDidMount() {
        // console.log(666);
    }
}

export default Login;