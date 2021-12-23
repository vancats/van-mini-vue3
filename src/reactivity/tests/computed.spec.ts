/*
 * @Author: Lqf
 * @Date: 2021-12-23 21:52:09
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-23 23:30:30
 * @Description: 我添加了修改
 */

import { computed } from "../computed"
import { reactive } from "../reactive"

describe('computed', () => {
  it('basic', () => {
    const user = reactive({ age: 1 })
    const age = computed(() => {
      return user.age
    })
    expect(age.value).toBe(1)
  })

  it('should compute lazily', () => {
    const user = reactive({ age: 10 })
    const getter = jest.fn(() => {
      return user.age
    })
    const cValue = computed(getter)

    // lazy
    expect(getter).not.toHaveBeenCalled()

    expect(cValue.value).toBe(10)
    expect(getter).toHaveBeenCalledTimes(1)
 
    // should not compute again
    cValue.value
    expect(getter).toHaveBeenCalledTimes(1)

    // should not compute until needed
    user.age = 20 // trigger -> effect -> get
    expect(getter).toHaveBeenCalledTimes(1)

    // now it should compute
    expect(cValue.value).toBe(20)
    expect(getter).toHaveBeenCalledTimes(2)


    // should not compute again
    cValue.value
    expect(getter).toHaveBeenCalledTimes(2)
  })
}) 
