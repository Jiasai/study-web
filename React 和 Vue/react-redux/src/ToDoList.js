//容器组件-'聪明组件'-负责组件的逻辑
import React, { Component } from 'react';
import TodoListUI from './ToDoListUI';

//引入store数据仓库
import store from './store/index';

//引入actionCreators.js
import { getInputChangeAction, getListChangeAction, getDeleteItemAction } from './store/actionCreators';

class ToDoList extends Component {
    constructor(props) {
        super(props);

        //修改 storeChangeState 方法的this指向
        this.storeChangeState = this.storeChangeState.bind(this)

        //调用store的getState()方法拿到数据，赋值给组件自己的state
        this.state = store.getState();

        this.InputChange = this.InputChange.bind(this);
        this.KeyUp = this.KeyUp.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    render() {
        return <TodoListUI
            inputValue={this.state.inputValue}
            list={this.state.list}
            InputChange={this.InputChange}
            KeyUp={this.KeyUp}
            handleDeleteItem={this.handleDeleteItem}
        />
    }

    InputChange(e) {
        //创建action
        const action = getInputChangeAction(e.target.value);
        //告诉store
        store.dispatch(action);
    }

    KeyUp(e) {
        if ((e.keyCode === 13 && e.target.value !== '') || (e._reactName === 'onClick' && this.state.inputValue !== '')) {
            //创建action
            const action = getListChangeAction();
            //告诉store,修改
            store.dispatch(action);
        }
    }

    handleDeleteItem(index) {
        const action = getDeleteItemAction(index);
        store.dispatch(action);
    }

    storeChangeState() {
        //调用setState，用store取来的数据修改state
        this.setState(store.getState());
    }
    componentDidMount() {
        //store.subscribe订阅监督store改变，执行storeChangeState函数
        //（每次store改变都会被感知，执行函数）
        store.subscribe(this.storeChangeState);
    }
}

export default ToDoList;