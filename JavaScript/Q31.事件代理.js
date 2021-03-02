// 事件代理原理：就是把多个子节点的事件处理，通过事件冒泡的方式，冒泡到父元素上统一处理。

window.onload = function() {
  let oBtn = document.getElementById('btn');
  let oUl = document.getElementById('ul1');
  let num = 4;

  // 事件委托，添加的子元素也有事件
  oUl.onmouseover = function(e) {
    e = e || window.event; // 解决浏览器兼容性问题
    let target = e.target || e.srcElement;  // 解决兼容性问题
    if(target.nodeName.toLowerCase() === 'li') {
      target.style.background = "red";
    }
  }

  oUl.onmouseout = function(e) {
    e = e || window.event; // 解决浏览器兼容性问题
    let target = e.target || e.srcElement;  // 解决兼容性问题
    if(target.nodeName.toLowerCase() === 'li') {
      target.style.background = "#fff";
    }
  }

  oBtn.onclick = function() {
    num++;
    let oLi = document.createElement('li');
    oLi.innerHTML = num;
    oUl.appendChild(oLi);
  }

}
