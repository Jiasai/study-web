"use strict";

var loadImgAsync = function loadImgAsync(url, ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      //Image()构造函数:图片对象
      var img = new Image(); //图片加载成功了

      img.onload = function () {
        resolve(img);
      }; //图片加载失败了


      img.onerror = function () {
        reject(new Error("\u627E\u4E0D\u5230\u56FE\u7247\u8DEF\u5F84 ".concat(url)));
      }; // 图片开始加载


      img.src = url;
    }, ms);
  });
};

var picListArr = ['http://climg.mukewang.com/5b16558d00011ed506000338.jpg', 'http://climg.mukewang.com/5b165603000146ca06000338.jpg', 'http://climg.mukewang.com/5b1656140001c89906000338.jpg'];

for (var i = 0; i < picListArr.length; i++) {
  loadImgAsync(picListArr[i], (i + 1) * 1000).then(function (img) {
    var bodys = document.getElementsByTagName('body')[0];
    var imgEl = document.createElement('img');
    imgEl.src = img.src;
    bodys.appendChild(imgEl);
  })["catch"](function (err) {
    console.log(err);
  });
}