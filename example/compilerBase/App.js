import { ref } from '../../lib/mini-vue.esm.js'

// 最简单的情况
// template 只有一个 interpolation
export default {
  template: `<p>{{msg}}{{count}}</p>`,
  setup() {
    const count = window.count = ref(1)

    return {
      msg: "vue3 - compiler ",
      count
    }
  },
}


// 复杂一点
// template 包含 element 和 interpolation 
// export default {
//   template: `<p>{{msg}}</p>`,
//   setup() {
//     return {
//       msg: "vue3 - compiler",
//     }
//   },
// }
