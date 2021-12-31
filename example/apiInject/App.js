/*
 * @Author: Lqf
 * @Date: 2021-12-31 19:46:02
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-31 21:33:16
 * @Description: 我添加了修改
 */

import { h, inject, provide } from '../../lib/mini-vue.esm.js'

const Provider = {
  name: 'Provider',
  setup () {
    provide('foo', 'foo')
    provide('bar', 'bar')
  },
  render () {
    return h('div', {}, [h('p', {}, 'Provider'), h(ProviderTwo)])
  }
}

const ProviderTwo = {
  name: 'ProviderTwo',
  setup () {
    provide('foo', 'fooTwo')
    const foo = inject('foo')
    return {
      foo
    }
  },
  render () {
    return h('div', {}, [h('p', {}, 'ProviderTwo - ' + this.foo), h(Consumer)])
  }
}

const Consumer = {
  name: 'Consumer',
  setup () {
    const foo = inject('foo')
    const bar = inject('bar')
    const baz = inject('baz', () => 'baz')
    return {
      foo,
      bar,
      baz
    }
  },
  render () {
    return h('div', {}, `Consumer: - ${this.foo} - ${this.bar} - ${this.baz}`)
  }
}

export default {
  name: 'App',
  setup () { },
  render () {
    return h('div', {}, [h('p', {}, 'apiInject'), h(Provider)])
  }
}