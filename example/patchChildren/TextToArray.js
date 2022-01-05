/*
 * @Author: Lqf
 * @Date: 2022-01-05 22:12:38
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-05 23:09:55
 * @Description: 我添加了修改
 */
import { ref, h } from "../../lib/mini-vue.esm.js"

const prevChildren = "oldChild"
const nextChildren = [h("div", {}, "A"), h("div", {}, "B")]

export default {
  name: "TextToArray",
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
