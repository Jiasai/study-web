//引入actionTypes
import { CHANGE_INPUT_VALUE, CHANGE_LIST_DATA, DELETE_LIST_ITEM } from './actionTypes';

//reducer目录
//state是放数据
//action是操作行为
const defaultState = {
    inputValue: '',
    list: [
        'Racing car',
        'Japanese princess ',
    ]
};

//reducer 可以接收state,但是绝不能直接修改state
//reducer是纯函数，纯函数指的是给固定的输入，就一定会有固定的输出，而且不会有任何副作用

const reducer = (state = defaultState, action) => {
    //state上一次store之中所有数据state , action 本次触发action的行为和数据
    //console.log(state,action);
    switch (action.type) {
        //创建修改inputValue的操作
        case CHANGE_INPUT_VALUE:
            if (true) {
                const newState = JSON.parse(JSON.stringify(state));
                //用JSON方案，深拷贝state数据
                newState.inputValue = action.inputValue;
                console.log(newState.inputValue);
                return newState;
            }
            break;
        //创建修改list的操作
        case CHANGE_LIST_DATA:
            if (true) {
                const newState = JSON.parse(JSON.stringify(state));

                newState.list.push(newState.inputValue);
                newState.inputValue = '';
                return newState;
            }
            break;
        //删除item 的操作
        case DELETE_LIST_ITEM:
            if (true) {
                const newState = JSON.parse(JSON.stringify(state));
                newState.list.splice(action.index, 1);
                return newState;
            }
            break;
        default:
            return state;
    }

}

export default reducer;