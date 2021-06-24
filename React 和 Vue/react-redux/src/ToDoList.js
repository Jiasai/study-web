
import React, { Component, Fragment } from 'react';
import { Input, Button, List } from 'antd';

import './ToDoList.css';

//引入store数据仓库
import store from './store/index';

class ToDoList extends Component {
    constructor(props) {
        super(props);

        //修改 storeChangeState 方法的this指向
        this.storeChangeState = this.storeChangeState.bind(this)

        //调用store的getState()方法拿到数据，赋值给组件自己的state
        this.state = store.getState();

        this.InputChange = this.InputChange.bind(this);
        this.KeyUp = this.KeyUp.bind(this);
    }

    render() {
        return (
            <Fragment>
                <div className='inputLayout'>
                    <label htmlFor='inputBox'>请输入:</label>
                    <Input
                        id='inputBox'
                        className='input'
                        value={this.state.inputValue}
                        placeholder={this.state.inputValue ? this.state.inputValue : 'Please input'}
                        onChange={this.InputChange}
                        onKeyUp={this.KeyUp}
                    />
                    <Button
                        type="primary"
                        onClick={this.KeyUp}
                    >提交</Button>
                </div>
                <ul className='ulList'>
                    <List
                        bordered
                        dataSource={this.state.list}
                        renderItem={item => (
                            <List.Item>
                                {item}
                            </List.Item>
                        )}
                    />
                </ul>
            </Fragment>
        )
    }

    InputChange(e) {

        //创建action,描述什么事和传值
        const action = {
            type: 'chang_input_value',
            inputValue: e.target.value
        }
        //告诉store
        store.dispatch(action);

    }

    KeyUp(e) {
        if ((e.keyCode === 13 && e.target.value !== '') || (e._reactName === 'onClick' && this.state.inputValue !== '')) {
            //创建action,描述什么事
            const action = {
                type: 'chang_List_data'
            }
            //告诉store,修改
            store.dispatch(action);
        }
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