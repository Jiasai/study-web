
import {init_status,Changed_status,DEFAULTS} from './constants';


class Scroll{
    constructor(options) {
        this.options = {
            ...DEFAULTS,
            ...options
        }

        this.critical_point = this.options.critical_point;

        //监听滚动事件的元素
        this.EventEl = this.options.EventEl;
        //滚动条所在容器
        this.ScrolltopEL = this.options.ScrolltopEL;

        //设置初始状态
        this.setStatus(init_status);

        //绑定下事件
        this.bindEvent();


    }
    setStatus(status) {
        this.status = status;
    }
    bindEvent() {
        const {change,reset}=this.options;
        
        this.EventEl.addEventListener("scroll", () => {

            if (this.isNeedChange()) {       

                this.setStatus(Changed_status);
                if(typeof change ==='function') change();

            } else if (this.needReset()) {
                
                this.setStatus(init_status);
                if(typeof reset ==='function') reset();
            }

        }, false);

    }

    //是否需要变化
    isNeedChange() {
        let t = this.critical_point;
        let s = this.ScrolltopEL.scrollTop;
        return this.status !== Changed_status && s > t;
        //通过状态的变化，避免多次事件触发执行
    }


    //是否需要还原
    needReset() {
        let t = this.critical_point;
        let s = this.ScrolltopEL.scrollTop;
        return this.status !== init_status && s <= t
    }




};




export default Scroll;
