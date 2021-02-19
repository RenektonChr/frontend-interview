// 防抖与节流

/**
 * 防抖
 * 
 * 原理：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
 * 
 * 适用场景：
 *    按钮提交场景，防止多次提交按钮，只执行最后一次的提交。
 *    搜索框联想场景，防止多次联想发送请求，只发送最后一次输入。
 */

//  简易版实现
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  }
}

// 立即执行版实现，有时希望立刻执行函数，然后等待停止触发n秒之后才可以重新触发执行。
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      console.log(1)
      const callNow = !timeout;
      console.log('callNow--->', callNow);
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) {
        func.apply(context, args);
      }
    } else {
      console.log(2)
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  }
}

// 返回值版实现
/**
 * func函数可能会有返回值，所以需要返回函数结果，但是当immediate为false的时候，
 * 因为使用了setTimeout，我们将func.apply(context, args)的返回值赋给变量，最后再
 * return的时候，值将会一直是undefined，所以只在immediate为true的时候才返回函数的
 * 执行结果。
 */

function debounce(func, wait, immediate) {
  let timeout, result;
  return function () {
    const context = this;
    const args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }

    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) {
        result = func.apply(context, args);
      }
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
    return result;
  }
}

// 节流
/**
 * 原理：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，
 * 只有一次生效。
 * 适用场景：
 * 1. 拖拽场景：固定时间内只执行一次，防止超高频次的位置变动。
 * 2. 缩放场景：监控浏览器的resize
 */

// 使用时间戳实现
function throttle(func, wait) {
  let context, args;
  let previous = 0;

  return function() {
    let now = +new Date();
    context = this;
    args = arguments;
    if(now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}

// 使用定时器实现
function throttle(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;

    if(!timeout) {
      timeout = setTimeout(function() {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  }
}

// 区别：防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。
