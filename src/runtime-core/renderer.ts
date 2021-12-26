/*
 * @Author: Lqf
 * @Date: 2021-12-25 22:40:37
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-26 18:00:51
 * @Description: 我添加了修改
 */

import { isObject } from "../shared/index"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {

  patch(vnode, container)

}

function patch(vnode, container) {

  // 判断是不是element
  if (typeof vnode.type === 'string') {
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container)
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
}

function mountElement(vnode: any, container: any) {
  const { type, props, children } = vnode
  const el = document.createElement(type)
  
  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }
  
  if (typeof children === 'string') {
    el.textContent = children
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el)
  }

  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach(child => {
    patch(child, container)
  })
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

