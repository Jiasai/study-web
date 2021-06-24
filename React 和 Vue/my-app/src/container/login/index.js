import React, { Component, Fragment } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
//withRouter 可以对这个要导出的组件，做个包装，在这个组件中，就有调用路由的能力了

import "./login.scss";
import { Modal, Button, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalshow: false,
      username: "",
      password: "",
    };
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalhide = this.handleModalhide.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.userinputWrite = this.userinputWrite.bind(this);
    this.passwordinputWrite = this.passwordinputWrite.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.KeyUpLogin = this.KeyUpLogin.bind(this);
    this.isLoginPushVip = this.isLoginPushVip.bind(this);
  }
  handleModalShow() {
    //显示modal
    this.setState({ modalshow: true });
  }
  handleModalhide() {
    //隐藏modal
    this.setState({ modalshow: false });
  }
  handleLogin() {
    //登录逻辑
    const { username, password } = this.state;
    const url = `http://www.dell-lee.com/react/api/login.json?user=${username}&password=${password}`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        const { login } = res.data.data;
        //弹出提示：成功
        if (login) {
          message.success("登录成功！");
          localStorage.setItem("login", login);
          //修改state
          setTimeout(
            (self) => {
              self.setState({ login, username, password, modalshow: false });
            },
            500,
            this
          );
        } else {
          message.error("登录失败！");
        }
      })
      .catch((err) => {
        message.error("请求失败！");
      });
  }
  handleLogOut() {
    //登出逻辑
    axios
      .get("http://www.dell-lee.com/react/api/logout.json", {
        withCredentials: true,
      })
      .then((res) => {
        const logout = res.data.data.logout;
        if (logout) {
          this.setState({ login: false });
          localStorage.setItem("login", false);
          const hide = message.error("退出登录");
          setTimeout(hide, 1000);
          this.props.history.push("/");
          //this.props.history.goBack(); //返回上一页
          //this.props.location.pathname //当前页面的路由url地址
          //this.props.history.push() //路由主动跳转
        }
      });
  }
  isLoginPushVip() {
    if (this.state?.login) {
      //判断已经登录
      this.props.history.push("/vip");
    } else {
      const hide = message.error("请登录查看");
      setTimeout(hide, 1000);
    }
  }
  userinputWrite(e) {
    //输入用户名
    this.setState({ username: e.target.value });
  }
  passwordinputWrite(e) {
    //输入密码
    this.setState({ password: e.target.value });
  }
  KeyUpLogin(e) {
    //回车提交
    if (e.keyCode === 13) {
      //按了回车键
      this.handleLogin();
    }
  }
  render() {
    return (
      <Fragment>
        <div className="login">
          {this.state?.login ? (
            <Button
              type="primary"
              data-login={this.state.login}
              onClick={this.handleLogOut}
            >
              退出
            </Button>
          ) : (
            <Button
              type="primary"
              data-login={this.state.login}
              onClick={this.handleModalShow}
            >
              登录
            </Button>
          )}
          <Button
            type="primary"
            onClick={this.isLoginPushVip}
            style={{ marginLeft: 10 }}
          >
            vip
          </Button>
        </div>
        <Modal
          title="登录"
          visible={this.state.modalshow}
          onOk={this.handleLogin}
          onCancel={this.handleModalhide}
        >
          <Input
            size="large"
            placeholder="username"
            value={this.state.username}
            prefix={<UserOutlined />}
            style={{ marginBottom: 10 }}
            onChange={this.userinputWrite}
          />
          <Input.Password
            size="large"
            placeholder="password"
            value={this.state.password}
            onChange={this.passwordinputWrite}
            onKeyUp={this.KeyUpLogin}
            prefix={<LockOutlined />}
          />
        </Modal>
      </Fragment>
    );
  }
  UNSAFE_componentWillMount() {
    if (localStorage.login !== undefined) {
      const login = JSON.parse(localStorage.getItem("login")); //一定要JSON转义
      //setState是异步的，会慢一点
      // 更新完login，再次执行 render函数
      this.setState(
        () => {
          return { login };
        },
        () => {
          this.render();
        }
      );
    } else {
      axios
        .get("http://www.dell-lee.com/react/api/isLogin.json", {
          withCredentials: true,
        })
        .then((res) => {
          const login = res.data.data.login;
          this.setState({ login });
        });
    }
  }
}

export default withRouter(Login);
