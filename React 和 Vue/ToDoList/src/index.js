import React, { Component } from 'react';
import ReactDom from 'react-dom';

import ToDoList from './ToDoList';

import Counter from './Counter';

import  LifeCycle from './LifeCycle';

//引入 Ant Design 样式
import 'antd/dist/antd.css';

import './index.css';

import AntDesign from './Antdesign';
import NewButton from './NewButton';

//引入使用React 路由
import {BrowserRouter,Route} from 'react-router-dom';


//Entry 入口组件,设置路由

class Entry extends Component {

    render(){
        return (
           <BrowserRouter> {/*BrowserRouter 代表 定义 1个路由*/}
           <div>
                {/*Route 代表路由项, path是访问的URL路径，
           component是要展示的组件,/:id 代表要传递的参数*/}
                 <Route path='/list/:id' component={AntDesign} /> 
                <Route path='/button' component={NewButton} />
            </div>
           </BrowserRouter>

           
        )
    }

}


//挂载

ReactDom.render(
    <ToDoList />
    , document.getElementById('root')
);

ReactDom.render(
    <Counter />
    , document.getElementById('counter')
);

ReactDom.render(
    <LifeCycle />
    ,document.getElementById('lifecycle')
);


ReactDom.render(
    <Entry />
    ,document.getElementById('entrys')
);





















