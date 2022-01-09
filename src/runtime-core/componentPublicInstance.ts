/*
 * @Author: Lqf
 * @Date: 2021-12-26 20:18:07
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-09 15:46:31
 * @Description: 我添加了修改
 */

import { hasOwn } from "../shared"

const publicPropertiesMap = {
  $el: (i) => i.vnode.el,
  $slots: (i) => i.slots,
  $props: (i) => i.props
}

export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { setupState, props } = instance
    if (key in setupState) {
      return setupState[key]
    }

    if (hasOwn(setupState, key)) {
      return setupState[key]
    } else if (hasOwn(props, key)) {
      return props[key]
    }

    const publicGetter = publicPropertiesMap[key]
    if (publicGetter) {
      return publicGetter(instance)
    }
  }
}