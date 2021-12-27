/*
 * @Author: Lqf
 * @Date: 2021-12-19 16:51:15
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-27 19:52:02
 * @Description: 我添加了修改
 */

export const extend = Object.assign

export const isObject = (val) => {
  return val !== null && typeof val === 'object'
}

export const hasChanged = (value, newValue) => {
  return !Object.is(value, newValue)
}

export const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key)
