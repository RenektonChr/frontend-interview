// 闭包的使用场景

// 1. 模块封装，在各模块规范出现之前，都是使用闭包的方式来防止变量污染全局
let Yideng = (function () {
  let foo = 0;
  function Yideng() { }
  Yideng.prototype.bar = function bar() {
    return foo;
  }

  return Yideng
}());

// 2. 在循环中创建闭包，防止取到意外的值
for (var i = 0; i < 3; i++) {
  document.getElementById('id' + i).onfocus = function () {
    alert(i);
  };
}
//可用闭包解决
function makeCallback(num) {
  return function () {
    alert(num);
  };
}
for (var i = 0; i < 3; i++) {
  document.getElementById('id' + i).onfocus = makeCallback(i);
}

