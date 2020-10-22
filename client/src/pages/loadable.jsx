/*路由懒加载(异步组件)*/
import React from 'react';
import Loadable from 'react-loadable';

//通用的过场组件(占位)
const LoadingComponent = (props) => {
    return (
        <div>loading...</div>
    )
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
// 占位：loading = LoadingComponent
export default (loader, loading = LoadingComponent) => {
    return Loadable({
        loader,
        loading
    });
}

// 使用
// import Loadable from "./loadable.jsx"
// Loadable(() => {
//     import("./pages/Home")
// })