//引入公共组件backtop
import Backtop from 'components/backtop';


let scrollContainer = document.getElementById("index-page");
let backtopEl = scrollContainer.querySelector(".backtop");


new Backtop(backtopEl,{
    EventEl:scrollContainer,
    ScrolltopEL:scrollContainer,
    critical_point: window.innerHeight||600,
    className: 'backtop-hidden'
});