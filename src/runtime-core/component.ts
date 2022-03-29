import { PublicInstanceProxyHandlers } from "./componentPublicInstance"
import { isObject } from "./../share/index"
import { initProps } from "./componentProps"
import { shallowReadonly } from "../reactive/reactive"
import { emit } from "./componentEmit"
import { initSlots } from "./componentSlot"

export function createComponentInstance(vnode, parent) {
  console.log('createComponentInstance: ', parent)
  const component = {
    vnode,
    type: vnode.type,
    props: {},
    setupState: {},
    emit: () => { },
    slots: {},
    provides: parent ? parent.provides : {},
    parent,
  }

  component.emit = emit.bind(null, component) as any
  return component
}

export function setupComponent(instance) {
  initProps(instance, instance.vnode.props)
  initSlots(instance, instance.vnode.children)
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  const Component = instance.type

  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)

  const { setup } = Component

  if (setup) {
    setCurrentInstance(instance)
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit
    })
    setCurrentInstance(null)
    handerSetupResult(instance, setupResult)
  }
}

function handerSetupResult(instance: any, setupResult: any) {
  // TODO Function
  if (isObject(setupResult)) {
    instance.setupState = setupResult
  }
  finishComponentSetup(instance)
}

function finishComponentSetup(instance) {
  const Component = instance.type

  instance.render = Component.render
}

let currentInstance = null
export function getCurrentInstance() {
  return currentInstance
}

function setCurrentInstance(instance) {
  currentInstance = instance
}