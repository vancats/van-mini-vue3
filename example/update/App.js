/*
 * @Author: Lqf
 * @Date: 2022-01-01 16:33:41
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-01 16:36:25
 * @Description: 我添加了修改
 */
import { h, ref } from "../../lib/mini-vue.esm.js"

export const App = {
  // 必须要写 render
  name: "App",
  render () {
    return h('div', { id: 'root' }, [
      h('div', {}, 'count: ' + this.count),
      h('button', { onClick: this.onClick }, 'click')
    ])
  },
  setup () {
    const count = ref(0)

    const onClick = () => {
      count.value++
    }
    return {
      count,
      onClick
    }
  },
}
