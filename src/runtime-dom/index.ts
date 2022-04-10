
import { createRenderer } from "../runtime-core/"
import { isOn } from "../share"

function createElement(type) {
  return document.createElement(type)
}

function patchProp(el, key, prevVal, nextVal) {
  if (isOn(key)) {
    const event = key.slice(2).toLowerCase()
    el.addEventListener(event, nextVal)
  } else {
    if (nextVal === undefined || nextVal === null) {
      el.removeAttribute(key, nextVal)
    } else {
      el.setAttribute(key, nextVal)
    }
  }
}

function insert(child, parent, anchor) {
  // parent.append(el)
  parent.insertBefore(child, anchor || null)
}

function remove(el) {
  const parent = el.parentNode
  if (parent) {
    parent.removeChild(el)
  }
}

function setElementText(el, text) {
  return el.textContent = text
}

function createElementText(text) {
  return document.createTextNode(text)
}

const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert,
  setElementText,
  createElementText,
  remove
})

export function createApp(...args) {
  return renderer.createApp(...args)
}

export * from '../runtime-core'