/*
 * @Author: Lqf
 * @Date: 2022-01-05 22:12:16
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-05 22:40:12
 * @Description: 我添加了修改
 */
import { ref, h } from "../../lib/mini-vue.esm.js"

const prevChildren = "oldChild"
const nextChildren = "newChild"

export default {
  name: "TextToText",
  setup() {
    const isChange = ref(false)
    window.isChange = isChange

    return {
      isChange,
    }
  },
  render() {
    const self = this

    return self.isChange === true
      ? h("div", {}, nextChildren)
      : h("div", {}, prevChildren)
  },
}
