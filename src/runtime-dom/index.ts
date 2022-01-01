/*
 * @Author: Lqf
 * @Date: 2022-01-01 15:06:32
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-01 15:58:59
 * @Description: 我添加了修改
 */

import { createRenderer } from "../runtime-core"

function createElement(type) {
  console.log('----createElement----')

  return document.createElement(type)
}

function patchProp(el, key, val) {
  console.log('----patchProp----')
  const isOn = (key: string) => /^on[A-Z]/.test(key)
  if (isOn(key)) {
    const event = key.slice(2).toLowerCase()
    el.addEventListener(event, val)
  } else {
    el.setAttribute(key, val)
  }
}

function insert(el, container) {
  console.log('----insert----')
  container.append(el)
}

const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert
})

export function createApp(...args) {
  return renderer.createApp(...args)
}


export * from '../runtime-core'
