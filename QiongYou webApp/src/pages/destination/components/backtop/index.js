//引入公共组件backtop
import Backtop from 'components/backtop';


let scrollContainer = document.getElementById("destination-content");
let backtopEl = document.querySelector("#destination-page .backtop");


new Backtop(backtopEl,{
    EventEl:scrollContainer,
    ScrolltopEL:scrollContainer,
    critical_point: scrollContainer.offsetHeight/2||200,
    className: 'backtop-hidden'
});

