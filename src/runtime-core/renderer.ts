/*
 * @Author: Lqf
 * @Date: 2021-12-25 22:40:37
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-26 22:07:20
 * @Description: 我添加了修改
 */

import { ShapeFlags } from "../shared/shapeFlags"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {

  patch(vnode, container)

}

function patch(vnode, container) {

  const { shapeFlag } = vnode
  // 判断是不是element
  if (shapeFlag & ShapeFlags.ELEMENT) {
    processElement(vnode, container)
  } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    processComponent(vnode, container)
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
}

function mountElement(vnode: any, container: any) {
  const { type, props, children, shapeFlag } = vnode
  const el = (vnode.el = document.createElement(type))

  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
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

function mountComponent(initialVNode: any, container) {

  const instance = createComponentInstance(initialVNode)

  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance: any, initialVNode, container) {

  const { proxy } = instance
  const subTree = instance.render.call(proxy)

  // vnode -> patch
  // vnode -> element -> mountELement
  patch(subTree, container)

  initialVNode.el = subTree.el
}

