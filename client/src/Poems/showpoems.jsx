import React from 'react';
import store from "../reducer.js";
import poemsStyle from "../pages/poems.module.css";

class Showpoems extends React.Component {
    constructor(arg) {
        super(arg)
        this.state = store.getState();
        store.subscribe(() => {
            this.setState(store.getState());
        })
    };
    render() {
        return (
            <div className={poemsStyle.content}>
                <h1 className={poemsStyle.title}>{this.state.searchArr[this.props.index].title}</h1>
                <div className={poemsStyle.dynAut}>
                    <span className={poemsStyle.dynasty}>{this.state.searchArr[this.props.index].dynasty} </span>
                    <span className={poemsStyle.author}>{this.state.searchArr[this.props.index].author}</span>
                </div>
                <p className={poemsStyle.text}>{this.state.searchArr[this.props.index].content}</p>
            </div>

        )
    }
}
export default Showpoems;