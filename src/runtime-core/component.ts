import { PublicInstanceProxyHandlers } from "./componentPublicInstance"
import { isObject } from "./../share/index"
import { initProps } from "./componentProps"
import { proxyRefs, shallowReadonly } from "../reactive"
import { emit } from "./componentEmit"
import { initSlots } from "./componentSlot"

export function createComponentInstance(vnode, parent) {
  // console.log('createComponentInstance: ', parent)
  const component = {
    vnode,
    type: vnode.type,
    next: null,
    props: {},
    setupState: {},
    emit: () => { },
    slots: {},
    provides: parent ? parent.provides : {},
    parent,
    isMounted: false,
    subTree: null,
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
    instance.setupState = proxyRefs(setupResult)
  }
  finishComponentSetup(instance)
}

function finishComponentSetup(instance) {
  const Component = instance.type
  if (compiler && !Component.render) {
    if (Component.template) {
      Component.render = compiler(Component.template)
    }
  }
  instance.render = Component.render
}

let currentInstance = null
export function getCurrentInstance() {
  return currentInstance
}

function setCurrentInstance(instance) {
  currentInstance = instance
}

let compiler

export function registerRuntimeCompiler(_compiler) {
  compiler = _compiler
}
