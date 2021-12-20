/*
 * @Author: Lqf
 * @Date: 2021-12-19 13:04:48
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-20 22:58:36
 * @Description: 我添加了修改
 */

import { reactive, isReactive } from '../reactive'

describe('reactive', () => {
  it('happy path', () => {
    const original = { foo: 1 }
    const observed = reactive(original)
    expect(observed).not.toBe(original)
    expect(observed.foo).toBe(1)
    // expect(isReactive(original)).toBe(false)
    expect(isReactive(observed)).toBe(true)
  })

  it('nested reactive', () => {
    const original = {
      nested: {
        foo: 1
      },
      array: [{ bar: 2 }]
    }
    const observed = reactive(original)
    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
    expect(isReactive(observed.array[0])).toBe(true)
  })
})