import React from 'react';
import { Redirect } from "react-router-dom"
import mydivStyle from "./mydiv.module.css"


class Mydiv extends React.Component {
    constructor(arg) {
        super(arg);
    };

    render() {
        return (
            <div className={mydivStyle.box} style={{
                height: "100%",
                width: "100%",
                position: "fixed",
                float: "left",
            }}>
            </div>
        )
    };
}

export default Mydiv;