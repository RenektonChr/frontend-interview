// 手写用es6 proxy 实现arr[-1]的访问
const negativeArray = els => {
  return new Proxy(els, {
    get(target, propKey, receiver) {
      return Reflect.get(target, +propKey < 0 ? String(+propKey + target.length) : propKey, receiver)
    }
  })
}

const unicorn = negativeArray(["京", "程", "一", "灯"]);
console.log(unicorn[-1]); 
