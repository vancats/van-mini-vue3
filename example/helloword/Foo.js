import { h, renderSlots, getCurrentInstance, inject, provide } from '../../lib/mini-vue.esm.js'
import { Bar } from './Bar.js'

export const Foo = {
  name: 'Foo',
  render() {
    const btn = h('button',
      {
        onClick: this.emitAdd
      },
      'emitAdd'
    )
    const foo = h('p', {}, 'foo' + this.add)
    console.log(this.$slots)
    const age = 18
    return h('div', {}, [foo, btn,
      renderSlots(this.$slots, 'header', { age }),
      renderSlots(this.$slots, 'footer'),
      h(Bar)
    ])
  },
  setup(props, { emit }) {
    console.log(props)
    props.count++

    const instance = getCurrentInstance()
    console.log('instance: ', instance)

    const emitAdd = () => {
      console.log('emit add')
      emit('add', 1, 2)
      emit('add-foo', 3, 4)
    }

    provide('add', 'AddFoo')
    const add = inject('add')
    return {
      emitAdd,
      add
    }
  }
}
