/*
 * @Author: Lqf
 * @Date: 2021-12-29 23:18:01
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-30 22:13:01
 * @Description: 我添加了修改
 */
import { h, renderSlots } from "../../lib/mini-vue.esm.js"

export const Foo = {
  setup () {
    return {}
  },
  render () {
    const foo = h("p", {}, "foo")

    const age = 18
    // children -> vnode
    // renderSlot
    return h("div", {},
      [
        renderSlots(this.$slots, 'header', { age }),
        foo,
        renderSlots(this.$slots, 'footer')
      ])
  },
}
