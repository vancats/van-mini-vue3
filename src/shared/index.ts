/*
 * @Author: Lqf
 * @Date: 2021-12-19 16:51:15
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-20 23:02:46
 * @Description: 我添加了修改
 */

export const extend = Object.assign

export const isObject = (val) => {
  return val !== null && typeof val === 'object'
}