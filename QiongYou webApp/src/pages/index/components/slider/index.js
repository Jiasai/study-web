//引入swiper的css
//因为使用npm安装，都在node_modules里,直接使用swiper引入，webpack自己会去node_modules里找，axios也一样
import "swiper/swiper-bundle.min.css";
//引入自己的css
import "./slider.css";

//引入axios
import axios from "axios/dist/axios";

//引入swiper的js
import Swiper from "swiper/swiper-bundle.min";

//引入config配置
import {swiperContainer,CONFIG,sliderLayouts} from './slider-config';

//获取模板内容
import render from "./slider.art";
//console.log(render()); 执行后获取模板中的内容

//获取数据接口
import { sliderURL } from "api/getURL";

const sliderlayout = document.getElementById(sliderLayouts);


const Slider1 = axios
  .get(sliderURL)
  .then((response) => {
    //response.data.data 是axios請求获得的数据
    sliderlayout.innerHTML = render({ 
      ...CONFIG,
      items: response.data.data 
    });
  })
  .then(() => {
    //实例化Swiper组件，实现轮播
    new Swiper(swiperContainer,CONFIG);
  })
  .catch((err) => {
    console.log(err);
  });
