import { hasChanged, isObject } from "./../share/index"
import { isTracking, trackEffects, triggerEffects } from "./effect"
import { reactive } from "./reactive"

class RefImpl {
  private _value: any
  public dep = new Set()
  private _rawValue: any
  private __v_isRef = true
  constructor(value) {
    // 保存原数据，以便后续的对比更新
    this._rawValue = value
    // 如果是对象，需要进行 reactive 转换
    this._value = convert(value)
  }

  get value() {
    // 如果在 effect 中，收集依赖
    trackRefValue(this)
    return this._value
  }
  set value(newValue) {
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue
      this._value = convert(newValue)
      // 如果在 effect 中，收集依赖
      triggerEffects(this.dep)
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep)
  }
}

export function ref(value) {
  return new RefImpl(value)
}

export function isRef(value) {
  return !!value.__v_isRef
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
        return (target[key].value = value)
      } else {
        return Reflect.set(target, key, value)
      }
    }
  })
}