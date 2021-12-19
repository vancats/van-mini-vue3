/*
 * @Author: Lqf
 * @Date: 2021-12-19 21:06:36
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-19 21:42:17
 * @Description: 我添加了修改
 */

import { readonly } from "../reactive"


describe('readonly', () => {
  it('readonly', () => {
    const original = { foo: 1, bar: { baz: 2 } }
    const wrapped = readonly(original)
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
