import { extend } from "../share"

let activeEffect
let shouldTrack
export class ReactiveEffect {
  private _fn: any
  public scheduler: Function | null
  deps = []
  active = true
  onStop?: () => void
  constructor(fn, scheduler?) {
    this._fn = fn
    this.scheduler = scheduler
  }
  run() {
    if (!this.active) {
      return this._fn()
    }
    // 判断是否需要依赖收集
    shouldTrack = true
    // 设置当前的 effect 以便后续依赖收集获取
    activeEffect = this
    const result = this._fn()
    shouldTrack = false
    return result
  }
  stop() {
    if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}

// 清除所有依赖
function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })
  effect.deps.length = 0
}

// 取出对应的 dep 并依赖收集
const targetMap = new Map()
export function track(target, key) {
  if (!isTracking()) return

  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  trackEffect(dep)
}

// 执行依赖收集
export function trackEffect(dep) {
  // 将该 effect 收集到该 key 的 dep 中去
  dep.add(activeEffect)
  // 反向收集，将该 dep 收集到该 effect 的 deps 中
  activeEffect.deps.push(dep)
}

// 是否在需要收集依赖
export function isTracking() {
  return shouldTrack && activeEffect !== undefined
}

// 触发依赖
export function trigger(target, key) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  triggerEffect(dep)
}

// 执行 effect
export function triggerEffect(dep) {
  for (const effect of dep) {
    // 如果传入了 scheduler，就执行它
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }

}

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler)
  // 把所有的属性合并进来
  extend(_effect, options)
  // 进来先执行一次
  _effect.run()
  // 注意 this 绑定
  const runner: any = _effect.run.bind(_effect)
  // 添加自己方便后续调用，如 stop
  runner.effect = _effect
  return runner
}

export function stop(runner) {
  runner.effect.stop()
}