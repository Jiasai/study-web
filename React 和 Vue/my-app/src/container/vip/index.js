import React, { Component } from "react";
//Redirect 路由重定向组件
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./vip.scss";

class Vip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
    };
  }
  render() {
    if (this.state.login) {
      //如果是登录状态，我就展示return()内容

      return <div className="vip">Vip页面</div>;
    } else {
      //否则重定向组件Redirect跳转首页
      return <Redirect to="/" />;
    }
  }
  UNSAFE_componentWillMount() {
    if (localStorage.login !== undefined) {
      const login = JSON.parse(localStorage.getItem("login")); //一定要JSON转义
      this.setState({ login, fetchFinish: true });
    } else {
      axios
        .get("http://www.dell-lee.com/react/api/isLogin.json", {
          withCredentials: true,
        })
        .then((res) => {
          const login = res.data.data.login;
          this.setState({ login, fetchFinish: true });
        });
    }
  }
}

export default Vip;
