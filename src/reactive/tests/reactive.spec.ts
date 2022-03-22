import { isReactive, reactive } from "../reactive"

describe('reactive', () => {
  it('happy path', () => {
    const original = { age: 10 }
    const observed = reactive(original)
    expect(observed).not.toBe(original)
    expect(observed.age).toBe(10)
    expect(isReactive(observed)).toBe(true)
    expect(isReactive(original)).toBe(false)
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
