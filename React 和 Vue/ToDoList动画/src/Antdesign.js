import React, { Component } from "react";

//引入要使用 List列表组件
import { List, Avatar } from "antd";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

class AntDesign extends Component {
  render() {
    
    //获得 路由URL 传递来的参数
    const {id} = this.props.match.params;
    console.log(id);

    return (
      <React.StrictMode>

        {/*引入使用List列表组件*/}
        <List
        style={{
            marginLeft:20,
            marginTop:20,
            marginRight:20,
            borderRadius:'10px',
            padding:'5px 10px',
            border:'1px solid #ddd'
        }}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </React.StrictMode>
    );
  }
}

export default AntDesign;
