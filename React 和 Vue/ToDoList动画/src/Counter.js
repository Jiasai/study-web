import React,{Component} from 'react';

class Counter extends Component{
    
    constructor(props){
        super(props);
        this.state={
            number:1
        }

        this.ChangeNumber=this.ChangeNumber.bind(this);
    
    }
    render(){
        //当组件 被初次创建时，render函数被执行1次
        //当 state数据发生改变的时候，render函数会被重新执行   ，渲染页面  
        //当 props传递的数据发生变化，子组件的 render函数也会被重新执行，渲染页面

        //通过ref可以获取DOM节点
        //ref属性写在 html标签上，获取的是 DOM节点
        // ref属性写在 组件标签上，获取的是 子组件(类)的js实例
        return(           
            <React.StrictMode>
                <button
                onClick={this.ChangeNumber}
                ref={(el)=>{this.buttonEL=el}}
                >增加</button>
                <div ref={(div)=>{this.divElem=div}}>
                    {sessionStorage.getItem('number')?sessionStorage.getItem('number'):this.state.number}
                </div>
            </React.StrictMode>
        )
  
    }

    ChangeNumber(){      
        //ref属性的函数是异步的，会 “慢一些” 执行  
        console.log(this.divElem);
        //通过 ref 获取DOM节点，输出DOM节点的信息，如offsetTop
        console.log(this.buttonEL.offsetTop); 
        //如果本地数据存在，使用本地存储数据    
        let number = sessionStorage.getItem('number')?sessionStorage.getItem('number'):this.state.number;
        number++;
        sessionStorage.setItem('number',number);//临时会话存储本地数据

        this.setState({number});


    }
}

export default Counter;