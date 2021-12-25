/*
 * @Author: Lqf
 * @Date: 2021-12-25 22:40:37
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-25 23:31:35
 * @Description: 我添加了修改
 */

import { createComponentInstance, setupComponent } from "./component"





export function render(vnode, container) {

  patch(vnode, container)

}

function patch(vnode, container) {

  // 判断是不是element
  processComponent(vnode, container)
}

function processComponent(vnode: any, container: any) {

  mountComponent(vnode, container)
}

function mountComponent(vnode: any, container) {

  const instance = createComponentInstance(vnode)

  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance: any, container) {

  const subTree = instance.render()

  // vnode -> patch
  // vnode -> element -> mountELement
  patch(subTree, container)
}

