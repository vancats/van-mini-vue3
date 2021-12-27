/*
 * @Author: Lqf
 * @Date: 2021-12-25 22:45:15
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-27 19:35:03
 * @Description: 我添加了修改
 */

import { shallowReadonly } from "../reactivity/reactive"
import { initProps } from "./componentProps"
import { PublicInstanceProxyHandlers } from "./componentPublicInstance"

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {}, 
    props: {},
    children: []
  }
  return component
}

export function setupComponent(instance) {
  initProps(instance, instance.vnode.props)
  // TODO
  // initSlots

  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {

  const Component = instance.type

  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)

  const { setup } = Component
  if (setup) {
    const setupResult = setup(shallowReadonly(instance.props) )

    handleSetupResult(instance, setupResult)
  }
}
function handleSetupResult(instance, setupResult: any) {
  // function || object
  // TODO function

  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }
  // 保证组件render有值
  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.type

  instance.render = Component.render

}

