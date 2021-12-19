/*
 * @Author: Lqf
 * @Date: 2021-12-19 13:07:35
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-19 14:58:07
 * @Description: 我添加了修改
 */

import { track, trigger } from "./effect"

export function reactive (raw) {
  return new Proxy(raw, {
    get(target, key) {
      const res = Reflect.get(target, key)
      track(target, key)
      return res
    },
    set(target, key, val) {
      const res = Reflect.set(target, key, val)
      // TODO 触发依赖
      trigger(target, key)
      return res
    }
  })
}