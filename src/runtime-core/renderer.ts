/*
* @Author: Lqf
* @Date: 2021-12-25 22:40:37
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-05 22:04:37
* @Description: 我添加了修改
*/


import { effect } from "../reactivity/effect"
import { EMPTY_OBJ } from "../shared"
import { ShapeFlags } from "../shared/shapeFlags"
import { createComponentInstance, setupComponent } from "./component"
import { createAppAPI } from "./createApp"
import { Fragment, Text } from "./vnode"

export function createRenderer(options) {
  const { createElement: hostCreateElement, patchProp: hostPatchProp, insert: hostInsert } = options

  function render(vnode, container) {
    patch(null, vnode, container, null)
  }

  function patch(n1, n2, container, parentComponent) {

    const { type, shapeFlag } = n2
    // 判断是不是element
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent)
        break
      case Text:
        processText(n1, n2, container)
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent)
        }
        break
    }
  }

  function processText(n1, n2: any, container: any) {
    const { children } = n2
    const textNode = (n2.el = document.createTextNode(children))
    container.append(textNode)
  }

  function processFragment(n1, n2: any, container: any, parentComponent) {
    mountChildren(n2, container, parentComponent)
  }

  function processElement(n1, n2: any, container: any, parentComponent) {
    if (!n1) {
      mountElement(n2, container, parentComponent)
    } else {
      patchElement(n1, n2, container)
    }
  }

  function patchElement(n1, n2, container) {
    console.log('patchElement')
    console.log('n1: ', n1)
    console.log('n2: ', n2)

    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ

    const el = (n2.el = n1.el)
    // props
    patchProps(el, oldProps, newProps)
    // children
  }


  function patchProps(el, oldProps, newProps) {
    if (oldProps !== newProps) {

      for (const key in newProps) {
        const prevProp = oldProps[key]
        const nextProp = newProps[key]
        if (prevProp !== nextProp) {
          hostPatchProp(el, key, prevProp, nextProp)
        }
      }

      if (oldProps === EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null)
          }
        }
      }
    }
  }

  function mountElement(vnode: any, container: any, parentComponent) {
    const { type, props, children, shapeFlag } = vnode
    const el = (vnode.el = hostCreateElement(type))

    // children
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode, el, parentComponent)
    }

    // props
    for (const key in props) {
      const val = props[key]

      hostPatchProp(el, key, null, val)

      // const isOn = (key: string) => /^on[A-Z]/.test(key)
      // if (isOn(key)) {
      //   const event = key.slice(2).toLowerCase()
      //   el.addEventListener(event, val)
      // } else {
      //   el.setAttribute(key, val)
      // }
    }

    hostInsert(el, container)
    // container.append(el)
  }

  function mountChildren(vnode, container, parentComponent) {
    vnode.children.forEach(v => {
      patch(null, v, container, parentComponent)
    })
  }

  function processComponent(n1, n2: any, container: any, parentComponent) {

    mountComponent(n2, container, parentComponent)
  }

  function mountComponent(initialVNode: any, container, parentComponent) {

    const instance = createComponentInstance(initialVNode, parentComponent)

    setupComponent(instance)
    setupRenderEffect(instance, initialVNode, container)
  }

  function setupRenderEffect(instance: any, initialVNode, container) {

    effect(() => {
      if (!instance.isMounted) {
        console.log('init')
        const { proxy } = instance
        const subTree = (instance.subtree = instance.render.call(proxy))
        // vnode -> patch
        // vnode -> element -> mountELement
        patch(null, subTree, container, instance)
        initialVNode.el = subTree.el
        instance.isMounted = true
      } else {
        console.log('update')
        const { proxy } = instance
        const subTree = instance.render.call(proxy)
        const prevSubtree = instance.subtree
        instance.subtree = subTree
        patch(prevSubtree, subTree, container, instance)
      }
    })
  }
  return {
    createApp: createAppAPI(render)
  }
}
