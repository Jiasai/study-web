import './product.css';
import 'components/loading/loading.css';

//获取模板内容
import render from "./items.art";

//引入axios
import axios from "axios/dist/axios";

//获取组件配置
import { productData,productID} from "./config";

axios.get(productData)
  .then((response) => {
     
    document.getElementById(productID).innerHTML = render({
      items: response.data.data,
    });
  })
  .catch((err) => {
    console.log(err);
  });
