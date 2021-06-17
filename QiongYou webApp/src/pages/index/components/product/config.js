//icode检验码
import icode from 'api/icode';

//product接口
const productData=`https://www.imooc.com/api/mall-wepApp/index/product?icode=${icode}`;

const productID ='product-list';

export { productData,productID};