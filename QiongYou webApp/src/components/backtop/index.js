import './backtop.css';
import 'icons/iconfont.css';

//导入Scroll类
import Scroll from 'utils/scroll';

class Backtop{
    constructor(el, options) {
        this.options =options;
        this.el = el;

        //滚动指针
        this.critical_point = this.options.critical_point;

        //监听滚动事件的元素
        this.EventEl = this.options.EventEl;

        //滚动条所在容器
        this.ScrolltopEL = this.options.ScrolltopEL;

        this.className = this.options.className;
  
        //使用Scroll类
        new Scroll({
            EventEl:this.EventEl,
            ScrolltopEL:this.ScrolltopEL,
            critical_point: this.critical_point,
            change:()=>{
                this.show();
            },
            reset:()=>{
                this.hide();
            },
        });

        //绑定下事件
        this.bindEvent();

    }

    bindEvent() {
        this.el.addEventListener('click',()=>{
            this.scrollTo();
        },false);

    }


    //显示
    show() {
        this.el.classList.remove(this.className);
    }

    //隐藏
    hide(){
        this.el.classList.add(this.className);
    }

    //滚动至顶部
    scrollTo(top=0,left=0){
        this.ScrolltopEL.scrollTo({ //原生js自带的scrollTo方法
            top,
            left,
            behavior:'smooth'
        });
    }

}

export default Backtop;


