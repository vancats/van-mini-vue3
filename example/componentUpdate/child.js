/*
 * @Author: Lqf
 * @Date: 2022-01-09 14:57:25
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-09 14:58:29
 * @Description: 我添加了修改
 */

import { h } from "../../lib/mini-vue.esm.js"
export default {
  name: 'Child',
  setup(props, { emit }) { },
  render(proxy) {
    return h("div", {}, [h("div", {}, "child - props - msg: " + this.$props.msg)])
  }
}