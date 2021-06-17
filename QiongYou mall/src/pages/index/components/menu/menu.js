let bannerNavUl = '';
let bannerNav = '';
let bannerLis = '';
let ELmenuBox='';

const menuFun=()=>{
    bannerNavUl = document.getElementById('banner-nav-ul');
    bannerNav = document.getElementById('banner-nav');   
    bannerLis = document.querySelectorAll('#banner-nav-ul li');
    ELmenuBox = document.querySelectorAll('.menus-box .menu');
// 事件委托，必须使用onmouseover事件，而不是onmouseenter，我们基础课上讲过，
// onmouseover冒泡，onmouseenter不冒泡
    bannerNavUl.addEventListener('mouseover',(e)=>{
        if (e.target.tagName.toLowerCase() == 'li') {
            // 得到触碰的这个li元素身上的data-t属性
            let t = e.target.getAttribute('data-t');
            // 排他操作，让所有的li都去掉current类名
            for(let i = 0; i < bannerLis.length; i++) {              
                bannerLis[i].className = bannerLis[i].getAttribute('data-t');
            }
            // 当前碰到的这个li，要加current类
            e.target.className =`${t} current`;
           
        }
    },false)

    // 当鼠标离开大盒子的时候，菜单要关闭
    bannerNav.onmouseleave = function () {
        for(var i = 0; i < bannerLis.length; i++) {
            bannerLis[i].className = bannerLis[i].getAttribute('data-t');
            ELmenuBox[i].className = 'menu';
        }
    }

}

export {menuFun,bannerLis,ELmenuBox};