import "./nav.css";

//获取模板内容
import render from "./nav.art";

//引入axios
import axios from "axios/dist/axios";

//获取数据接口
import { navdata } from "api/getURL";

axios
  .get(navdata)
  .then((response) => {
    document.getElementById("index-nav").innerHTML = render({
      items: response.data.data,
    });
  })
  .catch((err) => {
    console.log(err);
  });
