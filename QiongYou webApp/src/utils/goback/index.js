class Goback{
    constructor(el) {
        this.el = el;
        this.bindEvent();
    }
    bindEvent(){
        this.el.addEventListener('click',()=>{
            window.history.back();
        },false);
    }
  

}
export default Goback;