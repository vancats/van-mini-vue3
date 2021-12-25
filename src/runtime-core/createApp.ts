/*
 * @Author: Lqf
 * @Date: 2021-12-25 19:25:05
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-25 23:16:57
 * @Description: 我添加了修改
 */

import { createVNode } from "./vnode"
import { render } from "./renderer"

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // component -> vnode
      const vnode = createVNode(rootComponent)

      render(vnode, rootContainer)
    }
  }
}
