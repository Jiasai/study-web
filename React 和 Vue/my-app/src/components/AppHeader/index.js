import React, { Component,Fragment } from "react";
import { Link } from "react-router-dom";

import { Menu } from 'antd';
import { MailOutlined, BellOutlined, CiCircleOutlined,ClusterOutlined,AlertOutlined,BankOutlined } from '@ant-design/icons';

//引入 axios
import axios from 'axios';

//引入logo图片
import logo from './logo.png';

//引入样式
import './AppHeader.scss';


//使用Map数据格式，可以存放 组件
let m = new Map();
m.set('MailOutlined',<MailOutlined />);
m.set('BellOutlined',<BellOutlined />);
m.set('CiCircleOutlined',<CiCircleOutlined />);
m.set('ClusterOutlined',<ClusterOutlined />);
m.set('AlertOutlined',<AlertOutlined />);
m.set('BankOutlined',<BankOutlined />);


class AppHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            menuList:[]
        }
    }
    render(){
        return(
            <Fragment>
            <Link to={`/`}>
            <img src={logo} className='app-header-logo' alt='logo' />
            </Link>
            <Menu theme='light' mode="horizontal" className='app-header-menu'>
               {this.getMenuItem()}
            </Menu>
            </Fragment>
        )
    }
    getMenuItem(){
        return this.state.menuList.map((value,index)=>{
            return(
                <Menu.Item key={index} icon={m.get(value.icon)}>
                <Link to={`/${value.id}`}>
                {value.title}
                </Link>
              </Menu.Item>
            )
        });
        
    }

    //组件挂载完毕，自动执行
    componentDidMount(){
        const MenuListUrl = 'https://www.fastmock.site/mock/a4f2b81c0a3a2aeccaedc9f6a73ecb2f/react/api/menu';
        axios.get(MenuListUrl ).then(res=>{        
            const menuList = res.data.menuList;
            this.setState({menuList});

        }).catch(err=>{
            console.log(err);
        });

    }


}

export default AppHeader;