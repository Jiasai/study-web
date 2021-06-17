const LoadorNot =(el)=>{
        let pageHeight = window.innerHeight;
        let Gd = window.scrollY || document.documentElement.scrollTop;
        let top=el.offsetTop;
        if(Gd >= (top-pageHeight+300)){
            return true;
        }else{
            return false;
        }
 
}

export {LoadorNot};