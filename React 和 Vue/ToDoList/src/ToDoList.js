//定义React的 class组件 （最常用）
import React,{Component} from 'react';
//引入自己的 组件css
import './ToDoList.css';

//引入子组件
import CreateItemLi from './CreateItemLi';
import axios from 'axios';

class ToDoList extends Component{
    //constructor 在组件创建的第一个时刻被自动执行
    constructor(props){
        super(props); //传给基类
        this.state={ 
            inputValue:'',
            list:['learn React','learn Component','learn Vue']
        }
//在react中定义组件数据，要把它放在 this.state中
//react 是 响应数据式的框架，dom展示响应数据而变化,靠数据驱动

        //给类的方法，统一设置，指定this为当前类
        this.InputChange=this.InputChange.bind(this);
        this.KeyUp=this.KeyUp.bind(this);

        this.getData=this.getData.bind(this);
        this.setData=this.setData.bind(this);

    }
    render(){
        return(
            //这是普通注释，在JSX语法标签外，不限制
            <React.StrictMode>
            {/*     这是一个 JSX 语法标签中的注释写法   */ }
            <label htmlFor='inputBox'>请输入，回车确定：</label>   
            <input      
            id='inputBox'
            className='input'   
            value={this.state.inputValue}   
            placeholder={this.state.inputValue?this.state.inputValue:'Please input'}
            onChange={this.InputChange}
            onKeyUp={this.KeyUp}
            />
            <ul>
            {this.getListItem()}
            </ul>
            </React.StrictMode>
        )
    }
    getListItem(){ //把循环遍历state数据创建 li ，封装成调用方法
        //子组件标签上可以设置key值，提供map循环的性能
        
        //父子组件
        //父组件通过属性的形式 向 子组件传递 值和方法
        //父组件通过属性来和子组件 通信；       
       return this.state.list.map((value,index)=>{
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
    InputChange(e){       
        //通过onChange绑定事件，执行函数，通过bind设置this的指向 .bind(this)
        //通过react中的 setState()方法，传对象，改变this.state的数据

        this.setState({
            inputValue: e.target.value
        });
       
    }
    KeyUp(e){
        if(e.keyCode===13 && e.target.value !==''){ 
            //按下回车键,且input的 value值不为空
           const value = this.state.inputValue;           
           const list = [...this.state.list]; //复制新数组
           const inputValue='';
           list.push(value);
           this.setState({list,inputValue}); //修改list数据
        }
    }

    //父组件提供get方法，让子组件拿到数据
    getData(){
        return this.state;  //返回数据
    }
    //父组件提供set方法，让子组件修改数据, 
    setData(obj){
        this.setState(obj); //修改数据
    }
    
    //发起Ajax请求，获取数据放在componentDidMount生命周期函数中执行
    //因为生命周期函数componentDidMount 只会被执行1次，
    //在组件被挂载到页面上时执行一次，之后就不会重新执行了
    //componentWillMount也会被执行1次，网页应用没问题，但当我们用 RN时，
    //这里写ajax请求，容易发生冲突，所以用在componentDidMount()最好
    componentDidMount(){
        axios.get('/api/todolist').then(res=>{
            console.log(res.data.dat);
        }).catch(err=>{
            console.log(err);
           
        })
    }

}

export default ToDoList;