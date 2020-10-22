import React from 'react';
import store from "../reducer.js";
import goodStyle from "./Good.module.css";

class Goods extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            cars: store.getState()
        }
        store.subscribe(() => {
            this.setState({ cars: store.getState() });
        })

        // 数量加减 更新仓库
        // 1.修改仓库
        // 2.发请求改数据库
        this.sub = function () {
            if (this.state.cars.cars[this.props.index].count <= 0) {
                return;
            } else {
                var action = {
                    type: this.props.index,
                    count: --this.state.cars.cars[this.props.index].count,
                    id: this.state.cars.cars[this.props.index].id
                };
                store.dispatch(action);
            }
        }.bind(this);
        this.add = function () {

            var action = {
                type: this.props.index,
                count: ++this.state.cars.cars[this.props.index].count,
                id: this.state.cars.cars[this.props.index].id
            };
            store.dispatch(action);
        }.bind(this);
    };
    render() {
        return (<div className={goodStyle.minBox}>
            <div className={goodStyle.imgbox}>
                <div className={goodStyle.imgdiv}>
                    <img src={this.state.cars.cars[this.props.index].img} />
                </div >
                <div className={goodStyle.name}>{this.state.cars.cars[this.props.index].name} </div>
                <div className={goodStyle.price}>单价：{this.state.cars.cars[this.props.index].price}元 </div>
            </div>
            <div>
                <div className={goodStyle.subadd}>
                    <button onClick={this.sub} className={goodStyle.sub}>-</button>
                    <span>数量：{this.state.cars.cars[this.props.index].count} </span>
                    <button onClick={this.add} className={goodStyle.add}>+</button>
                </div>
            </div>
        </div>);
    };
}

export default Goods;
