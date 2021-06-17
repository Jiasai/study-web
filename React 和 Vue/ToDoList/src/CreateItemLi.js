
//定义React的 class组件 （最常用）
import React,{Component} from 'react';

class CreateItemLi extends Component{
    constructor(props){
        super(props);
        this.DeleteItemLi = this.DeleteItemLi.bind(this);
    }
    render(){
        //子组件通过 this.props的属性，从父组件接收传递的值和方法
        const {Value} = this.props;
       return (
        <li 
        onClick={this.DeleteItemLi}
        dangerouslySetInnerHTML={{__html:Value}}
        ></li>
        )
    }
    DeleteItemLi(){
        //子组件要改变 父组件的 this.state中list数据，无法直接操作，
        //子组件可以通过父组件传递提供的方法，来和父组件通信，进而操作父组件数据；
        const {Index,getdata,setdata} = this.props;
        const state = getdata();    //获取父组件数据
        state.list.splice(Index,1); //修改list数据, 通过数组 splice()方法，删除指定项            
        setdata(state); //修改父组件数据
    }

}

export default CreateItemLi;

/*  
        React 核心特性总结：

        声明式开发方式：
        声明式开发不需要你对Dom进行操作，你只需要定义好 JSX模板结构，定义好 数据内容，然后去 改变操作数据，数据发生变化，页面 Dom 就会自动发生变化，这就是声明式开发。

        命令式开发方式：
        页面上需要展示什么，需要你 一步一步告诉我怎么展示， 不断的 操作 Dom，来完成功能，耗时费力

        类比：盖房子，命令式开发需要我们，搬一块站，搭一块瓦，一点一点把房子盖好。而声明式，是我们把图纸画好，把砖、瓦材料准备好，最后，自动的就有人帮我们把房子 改好了。
         */

       /*  
        与其它框架 共存
        react组件功能等 只和 它挂载的 dom节点 产生关系，其他的 dom节点，你可以使用 Vue/jQuery等其他框架去 操作实现，他们之间不会有影响，可以并存 

       组件化
        react开发，通过组件的形式，页面被拆分成一个又一个组件，通过组件的相互通信，实现各种功能
         */

       /* 
       单向数据流
       父组件改变数据，可以直接改变子组件的展示方式 
       子组件不能直接访问和改变父组件的数据，
       子组件要通过调用父组件提供的方法，来改变父组件的数据；

       函数式编程
       每一个组件，都是有很多个函数“组合成”的，这样，代码维护性很高，编写效率提升，也使得前端自动化测试，效率很高。
       
*/





