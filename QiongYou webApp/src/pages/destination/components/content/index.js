import './content.css';

//导入 content模板内容
import render from './content.art';

//导入 Loading模板内容
import renderLoading from 'components/loading/loading.art';

class Content{
    constructor(el){
        this.el = el;       
    }
    set(data){
        this.el.innerHTML = render({items:data});
    }
    setLoading(){
        this.el.innerHTML = renderLoading();
    }
}

export default Content;
