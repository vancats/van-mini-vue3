/*
 * @Author: Lqf
 * @Date: 2021-12-29 23:18:01
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-31 00:28:44
 * @Description: 我添加了修改
 */
import { h, createTextVNode } from "../../lib/mini-vue.esm.js"
import { Foo } from "./Foo.js"

// Fragment 以及 Text
export const App = {
  name: "App",
  render () {
    const app = h("div", {}, "App")
    const foo = h(Foo, {},
      {
        header: ({ age }) => [
          h('p', {}, 'header' + age),
          createTextVNode('hello world')
        ],
        footer: () => h('p', {}, 'footer')
      })
    return h("div", {}, [app, foo])
  },

  setup () {
    return {}
  },
}
