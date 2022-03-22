import { ReactiveEffect } from "./effect"

class ComputedRefImpl {
  private _effect: ReactiveEffect
  private _dirty: boolean = true
  private _value: any
  constructor(getter) {
    this._effect = new ReactiveEffect(getter, () => {
      // scheduler 执行打开 dirty，但未执行，只有调用才执行
      if (!this._dirty) {
        this._dirty = true
      }
    })
  }

  get value() {
    if (this._dirty) {
      this._dirty = false
      this._value = this._effect.run()
    }
    return this._value
  }
}

export function computed(getter) {
  return new ComputedRefImpl(getter)
}