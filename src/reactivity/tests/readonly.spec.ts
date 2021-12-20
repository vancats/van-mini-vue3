/*
 * @Author: Lqf
 * @Date: 2021-12-19 21:06:36
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-20 23:07:24
 * @Description: 我添加了修改
 */

import { readonly, isReadonly } from "../reactive"


describe('readonly', () => {
  it('readonly', () => {
    const original = { foo: 1, bar: { baz: 2 } }
    const wrapped = readonly(original)
    expect(isReadonly(original)).toBe(false)
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(wrapped.bar)).toBe(true)
    expect(isReadonly(original.bar)).toBe(false)
    expect(wrapped).not.toBe(original)
    expect(wrapped.foo).toBe(1)
  })

  it('should call console.warn when set', () => {
    console.warn = jest.fn()
    const user = readonly({ age: 10 })
    user.age = 11
    expect(console.warn).toHaveBeenCalled()
  })
})
