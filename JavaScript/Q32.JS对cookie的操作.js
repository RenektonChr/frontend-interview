// 设置cookie
function setCookie(name, value) {
  let Days = 30;
  let exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
}

// 读取cookie
function getCookie(name) {
  let arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr = document.cookie.match(reg))
  return unescape(arr[2]);
  else
  return null;
}

// 删除cookie
function delCookie(name) {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = getCookie(name);
  if(cval != null) {
    document.cookie= name + "=" +cval + ";expires=" + exp.toGMTString();
  }
}

