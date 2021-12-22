/*
 * @Author: Lqf
 * @Date: 2021-12-22 20:49:42
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-22 21:15:16
 * @Description: 我添加了修改
 */

import { effect } from "../effect"
import { ref } from "../ref"

describe('ref', () => {
  it('basic', () => {
    const a = ref(1)
    expect(a.value).toBe(1)
  })
  
  it('should be reactive', () => {
    const a = ref(1)
    let dummy
    let call = 0
    effect(() => {
      call++
      dummy = a.value
    })
    expect(call).toBe(1)
    expect(dummy).toBe(1)
    a.value = 2
    expect(call).toBe(2)
    expect(dummy).toBe(2)
    // same value should no trigger
    a.value = 2
    expect(call).toBe(2)
    expect(dummy).toBe(2)
  })

  it('should make nested properties reactive', () => {
    const a = ref({
      count: 1
    })
    let dummy
    effect(() => {
      dummy = a.value.count
    })
    expect(dummy).toBe(1)
    a.value.count = 2
    expect(dummy).toBe(2)
  })
})
