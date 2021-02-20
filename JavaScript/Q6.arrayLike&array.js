// 数组和类数组
/**
 * 定义：
 *    数组是一个特殊对象，与常规的对象有很大区别：
 *      1. 当由新元素添加到列表中时，自动更新length属性。
 *      2. 设置length属性，可以截断数组。
 *      3. 从Array.prototype中继承了方法。
 *      4. 属性为'Array'
 * 
 *    类数组是一个拥有length属性，并且length属性值为非负整数的普通对象，类数组不能直接
 *    调用数组方法
 * 
 * 区别：类数组是简单对象，它的原型关系与数组不同。
 */

let arrayLike = {
  length: 10,
};

console.log(arrayLike instanceof Array);
