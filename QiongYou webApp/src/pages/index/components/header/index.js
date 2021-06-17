//引入
import Header from 'components/header';
import 'components/searchbox';


let scrollContainer = document.getElementById("index-page");
let headerEl = scrollContainer.querySelector(".header");


new Header(headerEl,{
    EventEl:scrollContainer,
    ScrolltopEL:scrollContainer,
    critical_point: 0,
    className: 'header-transition'
});