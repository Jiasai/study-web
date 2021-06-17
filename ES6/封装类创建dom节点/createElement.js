
//默认参数
const DEFAULTS = {
    Class:'default',
    Id:'',
    Text:'',
    Title:''
}
class createEL{
    constructor(elname,options){

       this.options = Object.assign({},DEFAULTS,options);
       this.elname = elname;
       this.lock = true;
       this.EL = this.create(elname);

       this.init();
       
    }
    init(){
        //设置创建的Element的属性
        this.setEL(this.EL);
    };
    //创建Element节点
    create(elname){
        return document.createElement(elname);
    }
    setEL(el){      
        
        switch(this.elname){
            case 'div':
            case 'span':
            case 'p':
            case 'i':
                this.setDiv(this.EL);
                break;
            case 'img':
                this.setImg(this.EL);
                break;
            case 'a':
                this.setA(this.EL);
                break;
            default:
                throw new Error(`"${this.elname}",是不合法dom节点`);
                this.lock= false;
                break;
        }

    }
    setDiv(el){
        let {Class,Id,Text} = this.options;
        el.className = Class;
        el.setAttribute('id',Id);  
        el.innerText=Text;
    }
    setImg(el){
        
    }
    setA(el){
        //el.setAttribute('title',Title);
    }
    //返回dom节点元素
    get(){
       if(this.lock) return this.EL;
    }
    set(key,value){
        if(!value||!key) return;
        this.EL.setAttribute(key,value);
    }

}

export default createEL;
