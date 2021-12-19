/*
 * @Author: Lqf
 * @Date: 2021-12-19 13:07:35
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-19 22:33:04
 * @Description: 我添加了修改
 */

import { mutableHandlers, readonlyHandlers } from "./baseHandler"

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly'
}

export function reactive(raw) {
  return createReactiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createReactiveObject(raw, readonlyHandlers)
}

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY]
}

function createReactiveObject(target, baseHandlers) {
  return new Proxy(target, baseHandlers)
}