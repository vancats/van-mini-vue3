/*
 * @Author: Lqf
 * @Date: 2021-12-19 21:24:09
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-19 21:44:15
 * @Description: 我添加了修改
 */

import { track, trigger } from "./effect"

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

function createGetter(isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key)
    if (!isReadonly) {
      track(target, key)
    }
    return res
  }
}

function createSetter() {
  return function set(target, key, val) {
    const res = Reflect.set(target, key, val)
    trigger(target, key)
    return res
  }
}

export const mutableHandlers = {
  get,
  set
}

export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    console.warn(`key :"${String(key)}" set 失败，因为 target 是 readonly 类型`, target)
    return true
  }
}

