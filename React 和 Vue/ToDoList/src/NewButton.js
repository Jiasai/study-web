import React, { Component } from "react";


//引入要使用 Button按钮组件从 antd中
import { Button } from "antd";

//引入 路由 的 Link
import {Link} from 'react-router-dom';

class NewButton extends Component {

  //组件挂载渲染时，自动执行的生命周期函数
  render() {
    return (
      <React.StrictMode>
        {/*使用了react的路由，就不能直接使用 a 标签 实现路由项 之间的跳转，要使用 Link
        /123 代表 传递了 123 这个参数
        */}
        <Link to='/list/123'>
        <Button type="primary">点我看看</Button>
        </Link>
      </React.StrictMode>
    );
  }
}

export default NewButton;
