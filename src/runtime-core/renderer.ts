/*
 * @Author: Lqf
 * @Date: 2021-12-25 22:40:37
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-31 21:34:59
 * @Description: 我添加了修改
 */

import { ShapeFlags } from "../shared/shapeFlags"
import { createComponentInstance, setupComponent } from "./component"
import { Fragment, Text } from "./vnode"

export function render(vnode, container) {

  patch(vnode, container, null)

}

function patch(vnode, container, parentComponent) {

  const { type, shapeFlag } = vnode
  // 判断是不是element
  switch (type) {
    case Fragment:
      processFragment(vnode, container, parentComponent)
      break
    case Text:
      processText(vnode, container)
      break
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container, parentComponent)
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container, parentComponent)
      }
      break
  }
}

function processText(vnode: any, container: any) {
  const { children } = vnode
  const textNode = (vnode.el = document.createTextNode(children))
  container.append(textNode)
}

function processFragment(vnode: any, container: any, parentComponent) {
  mountChildren(vnode, container, parentComponent)
}

function processElement(vnode: any, container: any, parentComponent) {
  mountElement(vnode, container, parentComponent)
}

function mountElement(vnode: any, container: any, parentComponent) {
  const { type, props, children, shapeFlag } = vnode
  const el = (vnode.el = document.createElement(type))

  for (const key in props) {
    const val = props[key]

    const isOn = (key: string) => /^on[A-Z]/.test(key)
    if (isOn(key)) {
      const event = key.slice(2).toLowerCase()
      el.addEventListener(event, val)
    } else {
      el.setAttribute(key, val)
    }
  }

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el, parentComponent)
  }

  container.append(el)
}

function mountChildren(vnode, container, parentComponent) {
  vnode.children.forEach(child => {
    patch(child, container, parentComponent)
  })
}

function processComponent(vnode: any, container: any, parentComponent) {

  mountComponent(vnode, container, parentComponent)
}

function mountComponent(initialVNode: any, container, parentComponent) {

  const instance = createComponentInstance(initialVNode, parentComponent)

  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance: any, initialVNode, container) {

  const { proxy } = instance
  const subTree = instance.render.call(proxy)

  // vnode -> patch
  // vnode -> element -> mountELement
  patch(subTree, container, instance)

  initialVNode.el = subTree.el
}



