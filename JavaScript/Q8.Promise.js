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

const

