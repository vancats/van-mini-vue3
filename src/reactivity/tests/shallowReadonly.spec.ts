/*
 * @Author: Lqf
 * @Date: 2021-12-22 20:23:46
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-22 20:27:19
 * @Description: 我添加了修改
 */

import { isReadonly, shallowReadonly } from "../reactive"

describe('shallowReadonly', () => {
  test('should not make non-reactive properties reactive', () => {
    const props = shallowReadonly({ n: { foo: 1 } })
    expect(isReadonly(props)).toBe(true)
    expect(isReadonly(props.n)).toBe(false)
  })

  it('should call console.warn when set', () => {
    console.warn = jest.fn()
    const user = shallowReadonly({ age: 10 })
    user.age = 11
    expect(console.warn).toHaveBeenCalled()
  })
})
