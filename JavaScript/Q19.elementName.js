// 点击页面标签，获取标签名称（注意浏览器的兼容性）

// 直接实现
// document.onclick = function(e) {
//   let e = e || window.event;  // 处理兼容性，获取事件对象
//   let o = e.target || e.srcElement; // 处理兼容性，获取事件目标
//   console.log(o.tagName.toLowerCase());
// }

// 优雅实现
function elementName(evt) {
  evt = evt || window.event;
  let selected = evt.target || evt.srcElement;
  let eleName = selected && selected.tagName ? selected.tagName.toLowerCase() : 'no tagName';
  console.log(eleName);
}

window.onload = function() {
  let el = document.getElementsByTagName('body');
  el[0].onclick = elementName
}
