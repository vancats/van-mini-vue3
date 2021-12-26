/*
 * @Author: Lqf
 * @Date: 2021-12-26 15:34:10
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-26 16:32:26
 * @Description: 我添加了修改
 */

import { createVNode } from "./vnode";

export function h(type, props?, children?) {
  return createVNode(type, props, children)
}