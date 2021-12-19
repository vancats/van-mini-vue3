/*
 * @Author: Lqf
 * @Date: 2021-12-19 12:35:05
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-19 15:12:52
 * @Description: 我添加了修改 
 */
import { effect } from '../effect'
import { reactive} from '../reactive'

describe('effect', () => {
  it('happy path', () => {
    const user = reactive({
      age: 10
    })
    let nextAge
    effect(() => {
      nextAge = user.age + 1 
    })
    expect(nextAge).toBe(11)

    // update
    user.age++
    expect(nextAge).toBe(12)
  })

  it('should return runner when call effect', () => {
    let foo = 10
    const runner = effect(() => {
      foo++
      return 'foo'
    })
    expect(foo).toBe(11)
    const res = runner()
    expect(foo).toBe(12)
    expect(res).toBe('foo')
  })
})