
//定义React的 class组件 （最常用）
import React,{Component,Fragment} from 'react';

//引入参数校验
import PropTypes from 'prop-types';


class CreateItemLi extends Component{
    constructor(props){
        super(props);
        this.DeleteItemLi = this.DeleteItemLi.bind(this);
    }

    //利用生命周期函数避免子组件render函数无意义刷新渲染，提升性能
    //事件绑定的bind(this),放在constructor中，提升性能
    //setState()内置了性能提升的机制，是异步的，可以把短时间多次数据改变结合成1次
    //React底层，用了虚拟DOM提升性能
    //底层用了 同层比对和key值提升虚拟DOM的比对速度，提升性能
    //借助shouldComponentUpdate避免组件无意义的render的渲染
    
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.Value !== this.props.Value){
            return true
        }else{
            return false
        }      
    }

    render(){
        console.log('子组件render执行了')
        //子组件通过 this.props的属性，从父组件接收传递的值和方法
        const {Value,test} = this.props;
       return (
        <Fragment>
            <li 
            onClick={this.DeleteItemLi}
            dangerouslySetInnerHTML={{__html:Value}}
            ></li>
            <p>{test}</p>
        </Fragment>
        )
    }
    DeleteItemLi(){
        //子组件要改变 父组件的 this.state中list数据，无法直接操作，
        //子组件可以通过父组件传递提供的方法，来和父组件通信，进而操作父组件数据；
        const {Index,getdata,setdata} = this.props;
        //对参数校验

        const state = getdata();    //获取父组件数据
        state.list.splice(Index,1); //修改list数据, 通过数组 splice()方法，删除指定项            
        setdata(state); //修改父组件数据
    }

}

//要对CreateItemLi组件做props做校验
CreateItemLi.propTypes = {
    Index:PropTypes.number,
    getdata:PropTypes.func,
    setdata:PropTypes.func,
    test:PropTypes.string.isRequired
}
//定义必传参数的默认值
CreateItemLi.defaultProps = {
    test: 'Hello,world'
}

/* 
//必须是其中1个 值
PropTypes.oneOf(['News', 'Photos'])
//必须是其中1种类型
PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
])
 */

//虚拟DOM的优势：
// 大大提升性能，虚拟DOM本质是js对象；
// 它使得跨端应用得以实现。
// （在浏览器，支持DOM，web应用正常运行，但是在APP应用中，不支持DOM，是没有办法直接运行DOM的。但是，如果是js对象，在不同的终端，被编译解析为终端可以运行的语言代码，如 React Native 编译成原生App支持的语言代码，就可以轻松实现跨端了--）

//虚拟DOM中的 Diff算法
// Diff：原始虚拟DOM 和 新的DOM 的比对、寻找差异的方式
//Diff算法，就是为了做虚拟DOM的比对，大大提升了虚拟DOM的比对性能。
//Diff算法 一个核心概念就是同级同层比较
//（虚拟dom树上，比对发现第一层不一样，后面的层级就不会再比较了，直接用下面新的替代旧的）
//使用 1个稳定的（后面不会修改，比如index经常改变）、唯一的 做 key值 才是对的。key值可以提升虚拟DOM 比较比对的 性能







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





