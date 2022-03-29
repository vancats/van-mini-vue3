
import { createRenderer } from "../runtime-core/"
import { isOn } from "../share"

export function createElement(type) {
  console.log('createElement------')
  return document.createElement(type)
}

export function patchProp(el, key, val) {
  console.log('patchProp------')
  if (isOn(key)) {
    const event = key.slice(2).toLowerCase()
    el.addEventListener(event, val)
  } else {
    el.setAttribute(key, val)
  }
}

export function insert(el, parent) {
  console.log('insert------')
  parent.append(el)
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