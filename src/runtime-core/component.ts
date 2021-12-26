/*
 * @Author: Lqf
 * @Date: 2021-12-25 22:45:15
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-26 17:19:02
 * @Description: 我添加了修改
 */

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type
  }
  return component
}

export function setupComponent(instance) {
  // TODO
  // initProps
  // initSlots

  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {

  const Component = instance.type
  const { setup } = Component
  if (setup) {
    const setupResult = setup()

    handleSetupResult(instance, setupResult)
  }
}
function handleSetupResult(instance, setupResult: any) {
  // function || object
  // TODO function

  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }
  // 保证组件render有值
  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.type

  instance.render = Component.render

}

