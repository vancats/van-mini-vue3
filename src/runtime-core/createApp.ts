/*
 * @Author: Lqf
 * @Date: 2021-12-25 19:25:05
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-01 15:28:14
 * @Description: 我添加了修改
 */

import { createVNode } from "./vnode"

export function createAppAPI(render) {
  return function createApp(rootComponent) {
    return {
      mount(rootContainer) {
        // component -> vnode
        const vnode = createVNode(rootComponent)

        render(vnode, rootContainer)
      }
    }
  }
}
