/**
 * 1. Promise的基本特性
 *    （1）Promise有三种状态：pending（进行中）、fulfilled（已成功）、rejected（已失败）
 *    （2）Promise对象接收一个回调函数作为参数
 */

// Promise简版实现
// class Promise {
//   constructor(executor) {
//     this.state = 'pending';
//     this.value = undefined;
//     this.reason = undefined;
//     let resolve = value => {
//       if(this.state === 'pending') {
//         this.state = 'fulfilled';
//         this.value = value;
//       }
//     };

//     let reject = reason => {
//       if(state === 'pending') {
//         this.state = 'rejected';
//         this.reason = reason;
//       }
//     };

//     try {
//       // 立即执行函数
//       executor(resolve, reject);
//     } catch(err) {
//       reject(err);
//     }
//   }

//   then(onFulfilled, onRejected) {
//     if(this.state === 'fulfilled') {
//       let x = onFulfilled(this.value);
//     }
//     if(this.state === 'rejected') {
//       let x = onRejected(this.reason);
//     }
//   }
// }

// 面试版本
function myPromise(constructor) {
  let self = this;
  self.status = 'pending';  // 定义改变之前的初始状态
  self.value = undefined;  // 定义状态为resolved时的值
  self.reason = undefined;  // 定义状态为rejected时的错误值

  // 声明resolve函数
  function resolve(value) {
    // 两个'==='保证了状态的改变是不可逆的
    if(self.status === 'pending') {
      self.value = value;
      self.status = 'resolved';
    }
  }

  // 声明reject函数
  function reject(reason) {
    if(self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected';
    }
  }

  // 捕获构造异常
  try {
    constructor(resolve, reject);
  }catch (err) {
    reject(err);
  }
}

myPromise.prototype.then = function(onFullfilled, onRejected) {
  let self = this;
  switch(self.status) {
    case 'resolved': 
      onFullfilled(self.value);
      break;
    case 'rejected':
      onRejected(self.reason);
      break;
    default: ;
  }
}

// 测试
var p = new myPromise(function(resolve, reject) {
  resolve(1)
})

p.then(function(res) {
  console.log('res--->', res);
});

// 大厂面试最终版

/********************************* start *********************************/

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function Promise(excutor) {
  let that = this;  // 缓存当前promise实例对象
  this.status = PENDING;  // 初始状态
  this.value = undefined;   // fulfilled状态时 返回的信息
  this.reason = undefined;  // rejected状态时 拒绝的原因
  this.onFulfilledCallbacks = [];  // 存储fulfilled状态对应的onFulfilled函数
  this.onRejectedCallbacks = [];
  function resolve(value) {   // value 成功态时接收的终值
    if(value instanceof Promise) {
      return value.then(resolve, reject);
    }
    // 实践中要确保 onFulfilled 和 onRejected ⽅方法异步执行，且应该在 then ⽅法被调⽤用的那一轮事件循环之后的新执⾏栈中执⾏。
    setTimeout(() => {
      // 调用resolve回调对应的onFulfilled函数
      if(that.status === PENDING) {
        // 只能由pending ----> fulfilled状态
        that.status = FULFILLED;
        that.value = value;
        that.onFulfilledCallbacks.forEach(cb => cb(that.value));
      }
    });
  }

  function reject(reason) {   // reason 失败状态时接收的原因
    setTimeout(() =>{
      // 调⽤用reject 回调对应onRejected函数
      if(that.status === PENDING) {
        // 只能由pending状态变为rejected状态
        that.status = REJECTED;
        that.reason = reason;
        that.onRejectedCallbacks.forEach(cb => cb(that.reason));
      }
    });
  }

  // 捕获在excutor执行器中抛出的异常
  try {
    excutor(resolve, reject);
  }catch(err) {
    reject(err);
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  let newPromise;
  // 处理参数默认值，确保参数后续能够继续执行
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

  if(that.status === FULFILLED) {
    return newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value);
          resolvePromise(newPromise, x, resolve, reject);
        }catch(err) {
          // 捕获前⾯面onFulfilled中抛出的异常then(onFulfilled, onRejected);
          reject(err);
        }
      })
    })
  }

  if(that.status === REJECTED) {  // 失败状态
    return newPromise = new Promise((resolve, reject) =>{
      setTimeout(() => {
        try {
          let x = onRejected(that.reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch(e) {
          reject(e);
        }
      })
    })
  }

  if(that.status === PENDING) {
    return newPromise = new Promise((resolve, reject) => {
      that.onFulfilledCallbacks.push((value) =>{
        try{
          let x = onFulfilled(value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch(err) {
          reject(err);
        }
      });

      that.onRejectedCallbacks.push((reason) => {
        try{
          let x = onRejected(reason);
          resolvePromise(newPromise, x, resolve, reject);
        }catch(err) {
          reject(err);
        }
      })
    })
  }
}
