import React,{Component} from 'react';

//引入 axios
import axios from 'axios';


//在 react中，生命周期函数指的是组件在某一时刻会自动执行的函数,也叫 “钩子函数”
//当数据发生变化时，render函数会被自动执行，所以render函数是react中的生命周期函数

//初始化阶段 （constructor会执行）
//挂载阶段 ：（render函数会执行、componentDidMount函数执行）2个钩子函数
//数据更新阶段：会依次执行 shouldComponentUpdate函数、render函数、componentDidUpdate函数 3个函数
//移除阶段：会执行 componentWillUnmount函数

class LifeCycle extends Component{
    constructor(props){
        super(props);
        this.state={
            number:1
        };
        this.handleClick = this.handleClick.bind(this);
        console.log('组件被创建，constructor');
    }
    handleClick(){
        let number =this.state.number + 1;
        this.setState({number});
    }
    //组件挂载渲染时，自动执行的生命周期函数
    render(){ 
        console.log('正在渲染，render');
        return(
            <React.StrictMode>
                <div onClick={this.handleClick} >Hello,world</div>
            </React.StrictMode>
        )
    }
    windowClick(e){
        console.log(`点击了`);
        console.log(e.target);
    }
    //组件挂载完毕，自动执行的生命周期函数
    componentDidMount(){ 
        //组件挂载完毕，完成渲染后，给window添加点击事件
        //componentDidMount函数，可以应用于 事件委托，实现批量事件监听
        window.addEventListener('click',this.windowClick,false);

        //组件挂载完毕，完成渲染后,发送 Ajax请求数据
        // const dataURL = 'http://css.thinkshe.com/api/youke/Applets-youke-index.json';
        const dataURL = 'https://www.fastmock.site/mock/6253670b375feca954cd084baad53d90/youke/api/index';
        axios.get(dataURL).then(res=>{ //通过 axios 发送get请求
            console.log(res.data);
        }).catch(err=>{console.log(err)});
    }

    //数据准备更新前，自动执行的生命周期函数
    //这个函数 需要返回一个布尔值 true 或 false
    //假如数据发生变化，我们又不需要重新渲染展示，可以设置返回 false, 
    //阻止后面render函数、componentDidUpdate函数的执行，可以提高性能
    shouldComponentUpdate(){
        console.log('数据准备更新前shouldComponentUpdate');
        return true;
    }

     //数据更新完毕，自动执行
    componentDidUpdate(){
        console.log('数据更新完毕componentDidUpdate');
        return true;
    }

    //组件在页面上，被移除时，自动执行
    componentWillUnmount(){
        console.log('组件在页面上被移除时componentWillUnmount');
        //解除 给 window添加的事件绑定
        window.removeEventListener('click',this.windowClick,false);
    }

    //生命周期函数 是 针对 组件的，无论父组件、子组件 都有它们各自的生命周期函数

}

export default LifeCycle;