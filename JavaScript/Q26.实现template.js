// 正则表达式
let str = "您好，<%=name%>。欢迎来到<%=location%>";
function template(str) {
  // your code
  return function(data) {
    return str.replace(/<%=(\w+)%>/g, (match, p) => data[p] || '');
  }
}
let compiled = template(str);
// compiled的输出值为：“您好，张三。欢迎来到网易游戏”
const compiledStr = compiled({ name: "张三", location: "网易游戏" });
console.log(compiledStr)