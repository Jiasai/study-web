
import React, { Component, Fragment } from 'react';
import { Input, Button, List } from 'antd';

//引入子组件
import CreateItemLi from './CreateItemLi';

import './ToDoList.css';

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            list: ['learn React', 'learn Component', 'learn Vue']
        }

        this.InputChange = this.InputChange.bind(this);
        this.KeyUp = this.KeyUp.bind(this);

        this.getData = this.getData.bind(this);
        this.setData = this.setData.bind(this);

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
    getListItem() {
        return this.state.list.map((value, index) => {
            return (
                <CreateItemLi
                    key={index}
                    Value={value}
                    Index={index}
                    getdata={this.getData}
                    setdata={this.setData}
                />
            )
        })
    }
    InputChange(e) {
        this.setState({
            inputValue: e.target.value
        });

    }
    KeyUp(e) {
        if ((e.keyCode === 13 && e.target.value !== '') || (e._reactName === 'onClick' && this.state.inputValue !== '')) {
            const value = this.state.inputValue;
            const list = [...this.state.list];
            const inputValue = '';
            list.push(value);
            this.setState({ list, inputValue });
        }
    }


    getData() {
        return this.state;  //返回数据
    }

    setData(obj) {
        this.setState(obj); //修改数据
    }

    componentDidMount() {
        let {list} = this.state;
        list = [...data,...list];
        this.setState({list});
    }

}

export default ToDoList;