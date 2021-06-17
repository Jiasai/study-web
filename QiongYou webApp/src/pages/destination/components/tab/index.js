import './tab.css';

// 涉及组件之间相互合作：tab组件和content组件合作
// //方式： 
// a.相互合作的组件，只提供方法，不直接调用使用方法；

// b.在公共的父组件中，调用子组件（tab/content）提供的方法,来完成功能；

//tab组件创建了两个方法：
//setActiveItem(1)
//to()

//content组件：
//set(data)

//导入 axios
import axios from 'axios/dist/axios';




import {dataURL,TAB_ITEM_CLASS,TAB_ITEM_ACTIVE_CLASSNAME} from './config';

let itemELS=null;

class Tab{
    constructor(el){
        this.itemELs=el.querySelectorAll(TAB_ITEM_CLASS);
        itemELS = this.itemELs;
    }

    setActiveItem(index){
        for (const item of this.itemELs) {
            item.classList.remove(TAB_ITEM_ACTIVE_CLASSNAME);
        }
        this.itemELs[index].classList.add(TAB_ITEM_ACTIVE_CLASSNAME);
    } 
    to(index){
        this.setActiveItem(index);

        const id= this.itemELs[index].dataset.id;

        if(this.axiosSource&&this.axiosSource.token){ //如果存在上一次请求且存在xhr对象           
           this.axiosSource.cancel('取消请求'); //上一次请求取消
        }
        
        this.axiosSource=axios.CancelToken.source();//axios请求取消设置

        //请求时，传入参数{cancelToken: this.axiosSource.token};
        return axios.get(`${dataURL}${id}`,{cancelToken: this.axiosSource.token});
    }


}

export {Tab,itemELS};
































