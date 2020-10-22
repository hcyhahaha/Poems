import React from 'react';
import { Redirect } from "react-router-dom"
import store from "../reducer.js";
import Nav from '../Nav/Nav.jsx';
import Button from '../Button/Button.jsx';
class Author extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = store.getState();
        store.subscribe(() => {
            this.setState(store.getState());
        })
        var data = {
            isShow1: false,
            isShow2: false,
            isShow3: false,
            isShow4: true,
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
        return (
            <div>
                <Nav></Nav>
                <h1>这是作者界面</h1>
                <Button></Button>
            </div>
        )
    };
}

export default Author;