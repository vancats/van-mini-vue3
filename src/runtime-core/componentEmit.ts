/*
 * @Author: Lqf
 * @Date: 2021-12-27 21:06:02
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-27 21:36:21
 * @Description: 我添加了修改
 */

import { camelize, toHandlerKey } from "../shared/index"

export function emit(instance, event, ...args) {
  const { props } = instance

  const handlerName = toHandlerKey(camelize(event))
  const handler = props[handlerName]
  handler && handler(...args)
}