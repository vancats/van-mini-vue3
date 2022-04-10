import { h, inject, ref } from '../../lib/mini-vue.esm.js'

export const Bar = {
  name: 'Foo',
  render() {

    return h('div', { ...this.classes }, [
      h('div', {}, 'bar' + this.add),
      h('button', { onClick: this.changeFoo }, 'changeFoo'),
      h('button', { onClick: this.deleteFoo }, 'deleteFoo'),
      h('button', { onClick: this.deleteBar }, 'deleteBar'),
    ])
  },
  setup(props, { emit }) {
    const add = inject('add')
    console.log(add, 'add')
    const classes = ref({
      foo: 'foo',
      bar: 'bar'
    })

    const changeFoo = () => {
      classes.value.foo = 'new-foo'
    }
    const deleteFoo = () => {
      classes.value.foo = undefined
    }
    const deleteBar = () => {
      classes.value = {
        foo: 'foo'
      }
    }

    return {
      add,
      classes,
      changeFoo,
      deleteBar,
      deleteFoo,
    }
  }
}
