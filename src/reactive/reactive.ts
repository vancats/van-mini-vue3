import { readonlyHandlers, mutableHandlers, shallowReadonlyHandlers } from "./baseHandlers"

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly'
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers)
}

export function shallowReactive(raw) {
  return createActiveObject(raw, shallowReadonlyHandlers)
}

function createActiveObject(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}

export function isReactive(value) {
  // 调用 createGetter，判断是否为 reactive
  return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY]
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value)
}
