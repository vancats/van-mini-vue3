/*
 * @Author: Lqf
 * @Date: 2021-12-25 19:36:12
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-26 22:07:41
 * @Description: 我添加了修改
 */

import { ShapeFlags } from "../shared/shapeFlags"

export function createVNode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    shapeFlag: getShapeFlag(type),
    el: null
  }

  if(typeof children === 'string') {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  } else if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  }
  return vnode
}

function getShapeFlag(type) {
  return typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}