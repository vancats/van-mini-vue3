/*
 * @Author: Lqf
 * @Date: 2021-12-27 18:57:34
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-27 19:16:56
 * @Description: 我添加了修改
 */

import { h } from "../../lib/mini-vue.esm.js"

export const Foo = {
  setup (props) {
    // 1. 传值
    console.log(props)
    // 3. readonly
    props.count++
  },
  render () {
    // 2. 代理
    return h('div', {}, 'foo ' + this.count)
  }
}