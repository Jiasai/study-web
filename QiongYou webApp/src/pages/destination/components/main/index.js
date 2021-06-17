import './main.css';

//导入loading
import 'components/loading';

//导入tab
import { Tab, itemELS } from '../tab';

//导入content
import Content from '../content';

//导入 封装 sessionStorage方法
import {set,get} from 'utils/sessionStorage';

//导入 content模板的内容
import render from '../content/content.art';

//实例化
const tabEL = document.querySelector('ul.tab');
const tabNew = new Tab(tabEL);
const content = new Content(document.getElementById('destination-content'));



//通过事件委托代理添加点击
tabEL.addEventListener('click', ev => {
    const itemEl = ev.target;
    //itemEl.tagName.toLowerCase()==='li'
    if (itemEl.classList.contains('tab-item')) {

        const index = itemEl.dataset.id - 1;
       
        //本地会话存储
       const storageName=`destination_content_${index}`;//名
        //根据名，使用sessionStorage封装的get获取值
        const storageContent=get(storageName);
       
        if(storageContent){ //如果本地有缓存

            tabNew.setActiveItem(index);//改变样式
            content.set(storageContent); //改变内容

        }else{
            //发起请求,开始加载
        const tabPromise = tabNew.to(index);

        //用loading组件过渡加载
        content.setLoading();

        //获取数据成功，改变内容
        tabPromise.then(response => {
            content.set(response.data.data);
            //保存本地数据
            set(storageName,response.data.data);

        }).catch(err => {
            console.log(err);
        });

    }
        
  }
}, false);



//模拟点击
itemELS[0].click();


