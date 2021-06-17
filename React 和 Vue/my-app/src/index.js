import React, { Component } from "react";
import ReactDOM from "react-dom";

//引入 index.css
import "./index.css";

//引入页面子组件
import AppHeader from "./components/AppHeader/index";
import PageList from "./container/List/index";
import Detail from "./container/Detail/index";

//引入使用React 路由
import { BrowserRouter, Route ,Switch } from "react-router-dom";

//引入使用 Ant Design
import "antd/dist/antd.css";

//引入 Ant 布局组件
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout
        style={{
          minWidth: 1280,
          minHeight: "100%",
        }}
      >
        <Header className="header">
          <AppHeader />
        </Header>
        <Content className="content-layout">
          <BrowserRouter>
            <Switch>
            <Route path="/detail" component={Detail} />
            <Route path="/" component={PageList} />
            
            </Switch>
          </BrowserRouter>
        </Content>
        <Footer className="footer">Footer</Footer>
      </Layout>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
