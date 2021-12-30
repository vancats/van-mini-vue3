/*
 * @Author: Lqf
 * @Date: 2021-12-29 23:36:57
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-31 00:21:06
 * @Description: 我添加了修改
 */

import { createVNode, Fragment } from "../vnode"

// 具名插槽
export function renderSlots(slots, name, props) {
  const slot = slots[name]
  if (typeof slot === 'function') {
    return createVNode(Fragment, {}, slot(props))
  }
}

