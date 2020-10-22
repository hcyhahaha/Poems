import React from 'react';
import { Redirect } from "react-router-dom"
import leftStyle from "./left.module.css"


class Left extends React.Component {
    constructor(arg) {
        super(arg);
    };

    render() {
        return (
            <div className={leftStyle.box} style={{
                height: "600px",
                width: "400px",
                position: "fixed",
                top:"100px",
                left:"-90px",
                float: "left",
            }}>
            </div>
        )
    };
}

export default Left;