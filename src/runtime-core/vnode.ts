/*
 * @Author: Lqf
 * @Date: 2021-12-25 19:36:12
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-25 23:30:15
 * @Description: 我添加了修改
 */

export function createVNode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children
  }
  return vnode
}