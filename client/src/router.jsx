import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dictum from "./Dictum/Dictum.jsx";
import Author from "./Author/Author.jsx";
import Details from "./Details/Details.jsx";
import Personal from "./Personal/Personal.jsx";
import Square from "./Square/Square.jsx";
import Related from "./Related/Related.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";


// 路由懒加载cnpm i -S react-loadable 异步组件
import loadable from './pages/loadable.jsx';

class RoterView extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    {/* Switch，只匹配一个,避免用户乱输  */}
                    <Route path="/" exact component={loadable(() => import('./pages/Home.jsx'))}></Route>
                    <Route path="/poems" component={loadable(() => import('./Poems/Poems.jsx'))}></Route>
                    <Route path="/dictum" component={Dictum}></Route>
                    <Route path="/author" component={Author}></Route>
                    <Route path="/details" component={Details}></Route>
                    <Route path="/personal" component={Personal}></Route>
                    <Route path="/square" component={Square}></Route>
                    <Route path="/related" component={Related}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/" component={Home}></Route>
                </Switch>
            </Router>
        );
    }
}

export default RoterView;