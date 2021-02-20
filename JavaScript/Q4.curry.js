// 函数柯里化
function add(...args) {
  // 求和
  return args.reduce((a, b) => a + b)
}

// 运用了递归的思想和函数柯里化，很巧妙的解决了问题。
function currying(fn) {
  let args = [];
  return function temp (...newArgs) {
    if(newArgs.length) {
      // 这里判断只要参数不为空，那么就会收集参数，收集成一个数组。
      args = [...args, ...newArgs];
      // 每次收集完都要返回当前的函数，相当于递归的操作
      return temp;
    } else {
      // 参数为空时，把收集到的参数进行累加
      let val = fn.apply(this, args);
      args = [];
      return val;
    }
  }
}
