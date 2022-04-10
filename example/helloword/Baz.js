import { h, ref } from '../../lib/mini-vue.esm.js'

const prevChildren = [h('div', {}, 'A'), h('div', {}, 'B')]
const nextChildren = 'next'

export const Baz = {
  name: 'Baz',
  render() {

    const self = this
    const now = self.isChange !== true ? h('div', {}, nextChildren) : h('div', {}, prevChildren)
    console.log('now: ', now)

    return now
  },
  setup() {
    const isChange = ref(false)
    window.isChange = isChange

    return {
      isChange
    }
  }
}
