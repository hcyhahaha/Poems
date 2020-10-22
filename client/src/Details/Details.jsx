import React from 'react';
import { Redirect } from "react-router-dom"
import Button from '../Button/Button.jsx';
import Nav from '../Nav/Nav.jsx';
import store from "../reducer.js";
import detStyle from "./details.module.css"
class Details extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            arr: store.getState()
        }
        store.subscribe(() => {
            this.setState({ arr: store.getState() });
        })
    };

    render() {
        return (
            <div>
                <Nav></Nav>
                {/* <h1>这是详情界面</h1> */}
                <div className={detStyle.detailsbox}>
                    <h1 className={detStyle.title}>{this.state.arr.detailsArr[0].title}</h1>
                    <div className={detStyle.dynastyBox}>
                        <span>{this.state.arr.detailsArr[0].dynasty} </span>
                        <span>{this.state.arr.detailsArr[0].author}</span>
                    </div>
                    <div className={detStyle.content}>{this.state.arr.detailsArr[0].content}</div>
                </div>
                <Button></Button>
            </div>
        )
    };
}

export default Details;