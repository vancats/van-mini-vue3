/*
 * @Author: Lqf
 * @Date: 2021-12-27 18:57:34
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-27 21:34:04
 * @Description: 我添加了修改
 */

import { h } from "../../lib/mini-vue.esm.js"

export const Foo = {
  setup (props, { emit }) {
    // 1. 传值
    console.log(props)
    // 3. readonly
    // props.count++
    const emitAdd = () => {
      emit('add', 1, 2)
      emit('add-foo', 1, 3)
    }
    return {
      emitAdd
    }
  },
  render () {
    // 2. 代理
    const foo = h('p', {}, 'foo ' + this.count)
    const btn = h('button', {
      onClick: this.emitAdd
    }, 'emitAdd')
    return h('div', {}, [foo, btn])
  }
}