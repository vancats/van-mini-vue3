/*
 * @Author: Lqf
 * @Date: 2021-12-19 13:04:48
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-19 13:17:08
 * @Description: 我添加了修改
 */

import {reactive} from '../reactive'

describe('reactive', () => {
  it('happy path', () => {
    const original = { foo: 1 }
    const observed = reactive(original)
    expect(observed).not.toBe(original)
    expect(observed.foo).toBe(1)
  })
})