//UI组件-'傻瓜组件'-负责组件的渲染展示
import React, { Fragment } from 'react';
import { Input, Button, List } from 'antd';
import './ToDoList.css';

//无状态组件：当1个组件只有1个render函数的时候，我们就可以用1个无状态组件来定义这个组件
//定义无状态组件，就是定义1个函数
//无状态组件就是1个函数，它的性能比类组件高

const TodoListUI = (props) =>{
    return (
        <Fragment>
        <div className='inputLayout'>
            <label htmlFor='inputBox'>请输入:</label>
            <Input
                id='inputBox'
                className='input'
                value={props.inputValue}
                placeholder={props.inputValue ? props.inputValue : 'Please input'}
                onChange={props.InputChange}
                onKeyUp={props.KeyUp}
            />
            <Button
                type="primary"
                onClick={props.KeyUp}
            >提交</Button>
        </div>
        <ul className='ulList'>
            <List
                bordered
                dataSource={props.list}
                renderItem={(item, index) => (
                    <List.Item
                        onClick={
                            (index) => props.handleDeleteItem(index)
                        }
                    >
                        {item}
                    </List.Item>
                )}
            />
        </ul>
    </Fragment>
    )
}

export default TodoListUI;