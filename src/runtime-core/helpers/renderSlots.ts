/*
 * @Author: Lqf
 * @Date: 2021-12-29 23:36:57
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-30 22:07:39
 * @Description: 我添加了修改
 */

import { createVNode } from "../vnode"
1
// 具名插槽
export function renderSlots(slots, name, props) {
  const slot = slots[name]
  if (typeof slot === 'function') {
    return createVNode('div', {}, slot(props))
  }
}

