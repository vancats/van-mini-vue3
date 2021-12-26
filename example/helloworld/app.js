/*
 * @Author: Lqf
 * @Date: 2021-12-25 19:27:27
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-26 15:44:55
 * @Description: 我添加了修改
 */


import { h } from '../../lib/mini-vue.esm.js'

export const App = {
  render () {
    return h('div', 'hi, ' + this.msg)
  },
  setup () {
    return {
      msg: 'mini-vue'
    }
  }
}