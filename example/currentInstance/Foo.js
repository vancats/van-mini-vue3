/*
 * @Author: Lqf
 * @Date: 2021-12-31 00:36:07
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-31 00:40:48
 * @Description: 我添加了修改
 */

import { h, getCurrentInstance } from '../../lib/mini-vue.esm.js'

export const Foo = {
  name: 'Foo',
  render () {
    return h('div', {}, 'foo')
  },
  setup () {
    const instance = getCurrentInstance()
    console.log('Foo: ', instance)
  }
}