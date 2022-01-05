/*
 * @Author: Lqf
 * @Date: 2022-01-01 16:33:41
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-05 21:56:59
 * @Description: 我添加了修改
 */
import { h, ref } from "../../lib/mini-vue.esm.js"

export const App = {
  // 必须要写 render
  name: "App",
  render() {
    return h('div', { id: 'root', ...this.props }, [
      h('div', {}, 'count: ' + this.count),
      h('button', { onClick: this.onClick }, 'click'),
      h('button', { onClick: this.onChangePropsDemo1 }, 'change-prop'),
      h('button', { onClick: this.onChangePropsDemo2 }, 'undefined-prop'),
      h('button', { onClick: this.onChangePropsDemo3 }, 'delete-prop')
    ])
  },
  setup() {
    const count = ref(0)

    const onClick = () => {
      count.value++
    }

    const props = ref({
      foo: 'foo',
      bar: 'bar'
    })

    const onChangePropsDemo1 = () => {
      props.value.foo = 'new-foo'
    }
    const onChangePropsDemo2 = () => {
      props.value.foo = undefined
    }
    const onChangePropsDemo3 = () => {
      props.value = {
        foo: 'foo',
        baz: 'baz'
      }
    }

    return {
      count,
      onClick,
      props,
      onChangePropsDemo1,
      onChangePropsDemo2,
      onChangePropsDemo3
    }
  },
}
