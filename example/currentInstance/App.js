/*
 * @Author: Lqf
 * @Date: 2021-12-31 00:36:07
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-31 00:44:59
 * @Description: 我添加了修改
 */

import { h, getCurrentInstance } from '../../lib/mini-vue.esm.js'
import { Foo } from './Foo.js'

export const App = {
  name: 'App',
  render () {
    return h('div', {}, [h('p', {}, 'currentInstance demo'), h(Foo)])
  },
  setup () {
    const instance = getCurrentInstance()
    console.log('App: ', instance)
  }
}