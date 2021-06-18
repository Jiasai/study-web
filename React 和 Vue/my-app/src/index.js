import React, { Component } from "react";
import ReactDOM from "react-dom";

//引入 index.css
import "./index.css";
import "./index.scss";

//引入页面子组件
import AppHeader from "./components/AppHeader/index";
import PageList from "./container/List/index";
import Detail from "./container/Detail/index";
import Login from './container/login/';

//引入使用React 路由
import { BrowserRouter, Route, Switch }
  from "react-router-dom";
//Switch代表，我找到1个匹配的路由（包含匹配），就不会继续往下找了,所有路由的配置要从复杂 到简单，从 /list 到 /

//引入使用 Ant Design
import "antd/dist/antd.css";

//引入 Ant 布局组件
import { Layout } from "antd";
const { Header, Footer, Content } = Layout;


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout
          style={{
            minWidth: 1200,
            minHeight: "100%",
          }}
        >
          <Header className="header">
            <AppHeader />
          </Header>
          <Content className="content-layout">
          {/*通过switch配置路由项,:id后加个？的意思是，id可以传也可以不传，我也能匹配*/}
          <Login />
            <Switch>           
              <Route path="/detail/:id" component={Detail} />
              <Route path="/:id?" component={PageList} />
             

            </Switch>

          </Content>
          <Footer className="footer">Footer</Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
