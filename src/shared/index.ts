/*
 * @Author: Lqf
 * @Date: 2021-12-19 16:51:15
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-27 21:35:45
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

export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, c: string) => {
    return c ? c.toUpperCase() : ''
  })
}

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const toHandlerKey = (str: string) => {
  return str ? 'on' + capitalize(str) : ''
}