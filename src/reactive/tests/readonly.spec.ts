import { isProxy, isReadonly, readonly } from "../reactive"

describe('readonly', () => {
  it('should make nested values readonly', () => {
    const original = { foo: 1, bar: { baz: 2 } }
    const wrapper = readonly(original)
    expect(wrapper).not.toBe(original)
    expect(wrapper.foo).toBe(1)
    expect(isReadonly(wrapper)).toBe(true)
    expect(isReadonly(original)).toBe(false)
    expect(isReadonly(wrapper.bar)).toBe(true)
    expect(isReadonly(original.bar)).toBe(false)
    expect(isProxy(wrapper)).toBe(true)
  })

  it('warn then call set', () => {
    console.warn = jest.fn()
    const user = readonly({ age: 10 })
    user.age = 11
    expect(console.warn).toBeCalled()
  })
})
