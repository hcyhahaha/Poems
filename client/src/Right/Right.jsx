import React from 'react';
import { Redirect } from "react-router-dom"
import rightStyle from "./right.module.css"


class Right extends React.Component {
    constructor(arg) {
        super(arg);
    };

    render() {
        return (
            <div className={rightStyle.box} style={{
                height: "600px",
                width: "320px",
                position: "fixed",
                right:0,
                float: "left",
            }}>
            </div>
        )
    };
}

export default Right;