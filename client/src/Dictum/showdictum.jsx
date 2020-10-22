import React from 'react';
import store from "../reducer.js";
import axios from 'axios';
import poemsStyle from "../pages/poems.module.css";

class Showdictum extends React.Component {
    constructor(arg) {
        super(arg)
        this.state = {
            arr: store.getState()
        }
        store.subscribe(() => {
            this.setState({ arr: store.getState() });
        })
        // 详情查看诗句
        this.searchDetails = function (e) {
            console.log(e.target.innerHTML);
            axios.get("http://10.55.58.252:7001/keydords",
                { params: { keydords: e.target.innerHTML } })
                .then((res) => {
                    console.log(res.data);
                    if (res.data[0]) {
                        var action = {
                            type: "detailsArr",
                            value: res.data
                        };
                        store.dispatch(action)
                        this.props.history.push("/details")
                    }
                })

        }
    };
    render() {
        return (
            <div className={poemsStyle.content}>
                <h1 className={poemsStyle.title}>{this.state.arr.dictumArr[this.props.index].title}</h1>
                <div className={poemsStyle.dynAut}>
                    <span className={poemsStyle.author}>{this.state.arr.dictumArr[this.props.index].author}</span>
                </div>
                <p className={poemsStyle.text} onClick={(e) => { this.searchDetails(e) }}>{this.state.arr.dictumArr[this.props.index].sentence}</p>
            </div>

        )
    }
}
export default Showdictum;