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

const reducer = (state = defaultState, action) => {
    //state上一次store之中所有数据state , action 本次触发action的行为和数据
    //console.log(state,action);

    //创建修改inputValue的操作
    if (action.type === 'chang_input_value') {
        const newState = JSON.parse(JSON.stringify(state));
        //用JSON方案，深拷贝state数据
        newState.inputValue = action.inputValue;
        return newState;
    }

    //创建修改list的操作
    if (action.type === 'chang_List_data') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue = '';
        return newState;
    }

    return state;
}

export default reducer;