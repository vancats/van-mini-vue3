import { hasChanged, isObject } from "../share"
import { isTracking, trackEffect, triggerEffect } from "./effect"
import { reactive } from "./reactive"

class RefImpl {
  private _value: any
  public dep: any
  private _rawvalue: any
  public __v_isRef = true
  constructor(value) {
    // 保存原数据，以便后续的对比更新
    this._rawvalue = this.value
    // 如果是对象，需要进行 reactive 转换
    this._value = convert(value)
    this.dep = new Set()
  }

  get value() {
    // 如果在 effect 中，收集依赖
    trackRefValue(this)
    return this._value
  }

  set value(newValue) {
    if (hasChanged(this._rawvalue, newValue)) {
      this._rawvalue = newValue
      this._value = convert(newValue)
      // 如果 dep 中有 effect，触发依赖
      triggerEffect(this.dep)
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffect(ref.dep)
  }
}

export function ref(value) {
  return new RefImpl(value)
}

export function isRef(value) {
  return !!value['__v_isRef']
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}

export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key) {
      return unRef(Reflect.get(target, key))
    },
    set(target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return target[key].value = value
      } else {
        return Reflect.set(target, key, value)
      }
    }
  })
}