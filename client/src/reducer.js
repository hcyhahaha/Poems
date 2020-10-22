import { createStore } from "redux";

// 私有化的仓库对象
var store = {
    login: "登录",
    arr: [],
    arrfenye: [],
    searchArr: [],
    dictumArr: [],
    detailsArr: [
        {
            author: "纳兰性德",
            content: "人生若只如初见，何事秋风悲画扇。等闲变却故人心，却道故人心易变。骊山语罢清宵半，泪雨霖铃终不怨。何如薄幸锦衣郎，比翼连枝当日愿。",
            dynasty: "清代",
            formality: "词",
            id: 9,
            title: "木兰花·拟古决绝词柬友",
            type: "爱情，写人，写景"
        }
    ],
    // 购物车
    cars: [],
    style: {
        isShow1: false,
        isShow2: false,
        isShow3: false,
        isShow4: false,
        isShow5: false,
        isShow6: false,
        isShow7: false,
        isShow8: false
    },
    msg: ""
}

const reducer = function (state = store, action) {
    console.log(state, action);//action是dispatch传入的对象
    if (action.type === "login") {
        state.login = action.value;
    } if (action.type === "arr") {
        state.arr = action.value;
    } if (action.type === "arrfenye") {
        state.arrfenye = action.value;
    } if (action.type === "searchArr") {
        state.searchArr = action.value;
    } if (action.type === "dictumArr") {
        state.dictumArr = action.value;
    } if (action.type === "detailsArr") {
        state.detailsArr = action.value;
    } if (action.type === "allcars") {
        state.cars = action.value;
    } if (action.type === "style") {
        state.style = action.value;
    }
    if (action.type === "msg") {
        state.msg = action.value;
    }
    return { ...state };//设置新的数据，创建新的对象，把原对象中的数据拷贝过来，返回
};
var obj = createStore(reducer)

export default obj;
// 导出模块化特点：内部变量私有化，不会污染全局