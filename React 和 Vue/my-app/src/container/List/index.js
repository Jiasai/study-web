import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './pagelist.scss';


import { List } from 'antd';

class PageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listdata: [],
      id: 1
    }
  }
  render() {
    return (
      <React.StrictMode>
        <List
          size="large"
          className='pageList'
          bordered
          dataSource={this.state.listdata}
          renderItem={
            item => (
              <List.Item>
                <Link to={`/detail/${item.id}`}>
                {item.title}
                </Link>
              </List.Item>
            )
          }
        />
      </React.StrictMode>
    )
  }
  get(url,id=1){//给id默认值1
    const newURL = `${url}?id=${id}`;
    axios.get(newURL).then(res => {
      //设置数据
      this.setState({
        listdata: res.data.data
      });
    }).catch(err => {
      console.log(err);
    });
  }
  //props参数变化时执行,接收新的props参数
  UNSAFE_componentWillReceiveProps(newProps) { 
     //获得路由URL传递来的 id
     const { id } = newProps.match.params;
     const baseUrl='http://www.dell-lee.com/react/api/list.json';
     
     this.get(baseUrl,id);
  }
  //组件挂载完毕执行，执行1次
  componentDidMount() {
    //获得路由URL传递来的 id
    const { id } = this.props.match.params;
    const baseUrl='http://www.dell-lee.com/react/api/list.json';
 
    this.get(baseUrl,id);
   
  }
}

export default PageList;