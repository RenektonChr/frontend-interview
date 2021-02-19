// 函数柯里化
function add(...args) {
  // 求和
  return args.reduce((a, b) => a + b)
}

function currying(fn) {
  let args = [];
  return function temp (...newArgs) {
    if(newArgs.length) {
      args = [...args, ...newArgs];
      return temp;
    } else {
      let val = fn.apply(this, args);
      args = [];
      return val;
    }
  }
}
