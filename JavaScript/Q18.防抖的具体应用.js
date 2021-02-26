/**
 * 题目：多个Tab只对应一个内容框，点击每个Tab都会请求接口并渲染到内容区域，怎么确保频繁点击tab但数据能够正确显示？
 * 
 * 分析：可以理解为连续触发多个请求，如何保证最后响应的的结果是最后发送的请求（不关注之前的请求是否发送或者响应成功）。
 * 
 * 解决方案：
 *  防抖（过滤掉一些非必要的请求）+ 取消上次未完成的请求
 * 
 * 取消请求的方法：
 *  XHR 使用 abort api
 *  axios 使用 cancel token 取消请求
 */

/**
 * 函数防抖，一定时间内连续触发事件只执行一次
 * @param func 需要防抖的函数
 * @param delay 防抖延迟
 * @param immediate 是否立即执行，为true表示连续触发时立即执行，即执行第一次，为false表示连续触发后delay ms后执行一次
 */

let debounce = function(func, delay = 100, immediate = false) {
  let timeoutId, last, context, args, result;

  function later() {
    const interval = Date.now() - last;
    if(interval < delay && interval > 0) {
      timeoutId = setTimeout(later, delay - interval)
    } else {
      timeoutId = null;
      if(!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  }

  return function() {
    context = this
    args = arguments
    last = Date.now()

    if(immediate && !timeoutId) {
      result = func.apply(context, args)
      context = args = null // 解除引用
    }

    if(!timeoutId) {
      timeoutId = setTimeout(later, delay);
    }

    return result;
  }
}
