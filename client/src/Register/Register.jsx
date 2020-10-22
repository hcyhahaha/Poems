import React from 'react';
import { Redirect } from "react-router-dom"
import axios from 'axios';
import Nav from '../Nav/Nav.jsx';
import store from "../reducer.js";
import registerstyle from "./register.module.css";
class Register extends React.Component {
    constructor(arg) {
        super(arg);
        console.log(this.props.location);
        this.state = {
            arr: store.getState(),
            // 验证码
            msg: "",
            email: "",
            password: "",
            nc: "",
            verif: ""
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
            isShow6: false,
            isShow7: false,
            isShow8: true
        }
        var action = {
            type: "style",
            value: data
        };
        store.dispatch(action)
        // 刷新验证码
        this.verifChange = function () {
            axios.get("http://10.55.58.252:7001/verif")
                .then((res) => {
                    localStorage.setItem("verif", res.data.text);
                    this.setState({ msg: res.data })
                });
        }.bind(this)
        this.emailChange = function (e) {
            this.setState({ email: e.target.value })
        }.bind(this);

        this.passwordChange = function (e) {
            this.setState({ password: e.target.value })
        }.bind(this);
        this.ncChange = function (e) {
            this.setState({ nc: e.target.value })
        }.bind(this);

        this.verifInput = function (e) {
            this.setState({ verif: e.target.value })
        }.bind(this);
        // 提交
        this.submit = function (e) {
            var data = {
                email: this.state.email,
                password: this.state.password,
                nc: this.state.nc,
                verif: this.state.verif,
                hcverif: this.state.msg.text
            }
            axios.post("http://10.55.58.252:7001/register", data)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.code === 4003) {
                        console.log(res.data.info);
                    } else if (res.data.code === 4001) {
                        alert("验证码错误！");
                    } else if (res.data.code === 4002) {
                        alert("邮箱已经注册过!");
                    } else if (res.data.code === 2001) {
                        alert("注册成功！");
                        this.props.history.push("/login")
                    } else {
                        alert("注册失败,稍后再试");
                    }
                })
        }.bind(this);
    };

    render() {
        return (
            <div>
                <Nav></Nav>
                <h1>这是注册界面</h1>
                <div className={registerstyle.box} >
                    <h1>注册</h1>
                    <input type="text" onChange={this.emailChange} placeholder="输入您的账号"></input>
                    <input type="password" onChange={this.passwordChange} placeholder="输入您的密码"></input>
                    <input type="text" onChange={this.ncChange} placeholder="输入您的昵称"></input>
                    <input type="text" onChange={this.verifInput} placeholder="验证码"></input>
                    <div onClick={this.verifChange} className={registerstyle.verifdiv} dangerouslySetInnerHTML={{ __html: this.state.msg.data }}></div>
                    <input onClick={this.submit} type="submit" name="" value="注册"></input>
                </div>
            </div>
        )
    };
    componentDidMount() {
        //页面一挂载就去请求验证码
        axios.get("http://10.55.58.252:7001/verif")
            .then((res) => {
                console.log(res.data);
                localStorage.setItem("verif", res.data.text);
                this.setState({ msg: res.data })
            });
    }
}

export default Register;