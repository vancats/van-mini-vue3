import { h, inject } from '../../lib/mini-vue.esm.js'

export const Bar = {
  name: 'Foo',
  render() {
    return h('div', {}, 'bar' + this.add)
  },
  setup(props, { emit }) {
    const add = inject('add')
    console.log(add, 'add')
    return {
      add
    }
  }
}
