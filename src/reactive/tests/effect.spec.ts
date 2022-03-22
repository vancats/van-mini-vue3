// import { effect, stop } from "../effect"
// import { reactive } from "../reactive"

// describe('effect', () => {
//   it('happy path', () => {
//     const user = reactive({
//       age: 10
//     })
//     let nextAge
//     effect(() => {
//       nextAge = user.age + 1
//     })

//     expect(nextAge).toBe(11)
//     user.age++
//     expect(nextAge).toBe(12)
//   })

//   it('should return runner when call effect', () => {
//     let foo = 10
//     const runner = effect(() => {
//       foo++
//       return 'foo'
//     })
//     expect(foo).toBe(11)
//     const r = runner()
//     expect(foo).toBe(12)
//     expect(r).toBe('foo')
//   })

//   it('scheduler', () => {
//     let dummy, run: any
//     const scheduler = jest.fn(() => {
//       run = runner
//     })
//     const obj = reactive({ foo: 1 })
//     const runner = effect(
//       () => {
//         dummy = obj.foo
//       },
//       { scheduler }
//     )

//     expect(scheduler).not.toHaveBeenCalled()
//     expect(dummy).toBe(1)

//     // should be called on first trigger
//     obj.foo++
//     expect(scheduler).toHaveBeenCalledTimes(1)
//     // should not run yet
//     expect(dummy).toBe(1)
//     // manually run
//     run()
//     // should have run
//     expect(dummy).toBe(2)
//   })

//   it('stop', () => {
//     let dummy
//     const obj = reactive({ foo: 10 })
//     const runner = effect(() => {
//       dummy = obj.foo
//     })
//     obj.foo++
//     expect(dummy).toBe(11)
//     stop(runner)
//     obj.foo++
//     expect(dummy).toBe(11)
//     runner()
//     expect(dummy).toBe(12)
//   })

//   it('onStop', () => {
//     let dummy
//     const obj = reactive({ foo: 10 })
//     const onStop = jest.fn()
//     const runner = effect(
//       () => {
//         dummy = obj.foo
//       },
//       {
//         onStop
//       }
//     )
//     stop(runner)
//     expect(onStop).toBeCalledTimes(1)
//   })
// })