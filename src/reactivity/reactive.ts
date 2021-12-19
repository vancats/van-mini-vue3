/*
 * @Author: Lqf
 * @Date: 2021-12-19 13:07:35
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-19 21:39:33
 * @Description: 我添加了修改
 */

import { mutableHandlers, readonlyHandlers } from "./baseHandler"

export function reactive (raw) {
  return createReactiveObject(raw, mutableHandlers)
}

export function readonly (raw) {
  return createReactiveObject(raw, readonlyHandlers)
}

function createReactiveObject(target, baseHandlers) {
  return new Proxy(target, baseHandlers)
}