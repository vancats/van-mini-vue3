/*
 * @Author: Lqf
 * @Date: 2021-12-29 23:25:43
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-30 22:12:03
 * @Description: 我添加了修改
 */

import { ShapeFlags } from "../shared/shapeFlags"

export function initSlots(instance, children) {
  const {vnode} = instance
  if (vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN) {
    normalizeObjectSlots(children, instance.slots )
  }
}

function normalizeObjectSlots(children: any, slots: any) {
  for (const key in children) {
    const value = children[key]
    slots[key] = (props) => normalizeSlotValue(value(props))
  }
}

function normalizeSlotValue(value) {
  return Array.isArray(value) ? value : [value]
}