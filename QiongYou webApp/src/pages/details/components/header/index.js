import './header.css';

//引入
import Header from 'components/header';
import Goback from 'utils/goback';


let scrollContainer = document.getElementById("details-page");
let headerEl = scrollContainer.querySelector(".header");


new Header(headerEl,{
    EventEl:scrollContainer,
    ScrolltopEL:scrollContainer,
    critical_point: 80,
    className: 'header-transition'
});

new Goback(document.getElementById('goback'));

