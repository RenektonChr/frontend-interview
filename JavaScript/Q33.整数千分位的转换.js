/**
 * 普通版
 * 优点：逻辑清晰
 * 缺点：太普通了
 */
function formatNumber(num) {
  let arr = [];
  let str = num + '';
  let count = str.length;
  while(count >= 3) {
    // 将字符串3个一组存入数组
    arr.unshift(str.slice(count - 3, count));
    count -= 3;
  }

  // 如果不是3的倍数就另外追加到数组
  str.length % 3 && arr.unshift(str.slice(0,str.length % 3));
  return arr.toString();
}

console.log('formatNumber', formatNumber(1234567890))

/**
 * 进阶版
 * 优点：使用JS API，对于API了如指掌。
 * 缺点：不好想
 */
function formatNumber2(num) {
  return num.toString().split('').reverse().reduce((prev, next, index) => {
    return (index % 3 ? next : next + ',') + prev;
  })
}
console.log('formatNumber2', formatNumber2(1234567890))

/**
 * 正则版
 * 优点：代码少，浓缩的都是精华
 * 缺点：需要对正则表达式的位置匹配有一个较深的认识，门槛比较高。
 */
function formatNumber3(num) {
  return (num+'').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
console.log('formatNumber3', formatNumber3(1234567890));
/**
 * API版本
 * 优点：简单粗暴，直接调用API
 * 缺点：IE兼容性问题，不过toLocalString的话IE6支持
 */
// 1.toLocalString
function formatNumber4(num){
  return num.toLocaleString('en-US');
}
console.log('formatNumber4', formatNumber4(1234567890));

// IntL对象 ES6
function formatNumber5(num) {
  return new Intl.NumberFormat().format(num);
}
console.log('formatNumber5', formatNumber5(1234567890));
