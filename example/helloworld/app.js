/*
 * @Author: Lqf
 * @Date: 2021-12-25 19:27:27
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-26 20:00:49
 * @Description: 我添加了修改
 */


import { h } from '../../lib/mini-vue.esm.js'

window.self = null
export const App = {
  render () {
    window.self = this
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard']
      },
      // string
      // 'hi, mini-vue'
      // array
      // [h('p', { class: 'red' }, 'hi'), h('p', { class: 'blue' }, 'mini-vue')]
      'hi, ' + this.msg
    )
  },
  setup () {
    return {
      msg: 'mini-vue'
    }
  }
}