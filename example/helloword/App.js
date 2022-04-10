import { h, createTextVNode, getCurrentInstance, provide } from '../../lib/mini-vue.esm.js'
import { Foo } from './Foo.js'
import { Baz } from './Baz.js'

// window.self = null
export const App = {
  name: 'App',
  render() {
    // window.self = this
    return h('div', {
      id: 'banner',
      class: 'red',
      // onClick() { console.log('on-click') },
      // onMousedown() { console.log('on-mousedown') }
    }, [
      h(
        'p',
        { class: 'blue' },
        'hi!' + this.msg
      ),
      h(
        Foo,
        {
          count: 1,
          onAdd: (...args) => { console.log('on---add', ...args) },
          onAddFoo: (...args) => { console.log('on---add----foo', ...args) }
        },
        {
          header: ({ age }) => h('div', {}, 'header' + age),
          footer: () => [h('div', { class: 'footer' }), createTextVNode('hello!')],
        },
      ),
      h(Baz)
    ])
  },
  setup() {
    // const instance = getCurrentInstance()
    // console.log('instance: ', instance)

    provide('add', 'ADD')
    return {
      msg: 'mini-vue!'
    }
  }
}
