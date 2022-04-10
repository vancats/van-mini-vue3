import { EMPTY_OBJ, hasOwn } from "./../share/index"
import { effect } from "../reactive"
import { createComponentInstance, setupComponent } from "./component"
import { createAppAPI } from "./createApp"
import { ShapeFlags } from "./shapeFlags"
import { Fragment, Text } from "./vnode"
import { shouldUpdateComponent } from "./componentUpdateUtils"
import { queueJob } from "./scheduler"

export function createRenderer(option) {

  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
    setElementText: hostSetElementText,
    createElementText: hostCreateElementText,
    remove: hostRemove
  } = option

  function render(vnode, container) {
    patch(null, vnode, container, null, null)
  }

  function patch(n1, n2: any, container: any, parentComponent, anchor) {
    const { type, shapeFlag } = n2
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent, anchor)
        break
      case Text:
        processText(n1, n2, container)
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent, anchor)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent, anchor)
        }
    }
  }

  function processComponent(n1, n2: any, container: any, parentComponent, anchor) {
    if (!n1) {
      mountComponent(n2, container, parentComponent, anchor)
    } else {
      updateComponent(n1, n2)
    }
  }

  function mountComponent(initialVNode: any, container: any, parentComponent, anchor) {
    const instance = (initialVNode.component = createComponentInstance(initialVNode, parentComponent))

    setupComponent(instance)
    setupRenderEffect(initialVNode, instance, container, anchor)
  }

  function updateComponent(n1, n2) {
    const instance = (n2.component = n1.component)
    if (shouldUpdateComponent(n1, n2)) {
      instance.next = n2
      instance.update()
    } else {
      n2.el = n1.el
      n2.vnode = n2
    }
  }


  function setupRenderEffect(initialVNode: any, instance: any, container, anchor) {
    instance.update = effect(() => {
      if (!instance.isMounted) {

        const { proxy } = instance
        const subTree = (instance.subTree = instance.render.call(proxy))
        patch(null, subTree, container, instance, anchor)

        initialVNode.el = subTree.el
        instance.isMounted = true
      } else {

        const { next, vnode } = instance
        if (next) {
          next.el = vnode.el
          updateComponentPreRender(instance, next)
        }

        const { proxy } = instance
        const prevTree = instance.subTree
        const subTree = (instance.subTree = instance.render.call(proxy))
        patch(prevTree, subTree, container, instance, anchor)
      }
    }, {
      scheduler: () => {
        console.log('scheduler-queue')
        queueJob(instance.update)
      }
    })
  }


  function processElement(n1, n2: any, container: any, parentComponent, anchor) {
    if (!n1) {
      mountElement(n2, container, parentComponent, anchor)
    } else {
      patchElement(n1, n2, container, parentComponent, anchor)
    }
  }

  function mountElement(n2: any, container: any, parentComponent, anchor) {

    const { type, props, children, shapeFlag } = n2
    const el = (n2.el = hostCreateElement(type))

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(n2.children, el, parentComponent, anchor)
    }
    for (const key in props) {
      const val = props[key]
      hostPatchProp(el, key, null, val)
    }

    hostInsert(el, container, anchor)
  }

  function patchElement(n1, n2: any, container: any, parentComponent, anchor) {
    console.log('n1: ', n1)
    console.log('n2: ', n2)

    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ

    const el = (n2.el = n1.el)
    patchChildren(n1, n2, el, parentComponent, anchor)
    patchProps(el, oldProps, newProps)

  }

  function patchProps(el, oldProps, newProps) {
    for (const key in newProps) {
      let prevProp = oldProps[key]
      let newProp = newProps[key]
      if (prevProp !== newProp) {
        hostPatchProp(el, key, prevProp, newProp)
      }
    }

    if (oldProps !== EMPTY_OBJ) {
      for (const key in oldProps) {
        let prevProp = oldProps[key]
        if (!hasOwn(newProps, key)) {
          hostPatchProp(el, key, prevProp, null)
        }
      }
    }
  }

  function mountChildren(children: any, container: any, parentComponent, anchor) {
    children.forEach(v => {
      patch(null, v, container, parentComponent, anchor)
    })
  }

  function processFragment(n1, n2: any, container: any, parentComponent, anchor) {
    mountChildren(n2.children, container, parentComponent, anchor)
  }

  function processText(n1, n2: any, container: any) {
    const { children } = n2
    const textNode = (n2.el = hostCreateElementText(children))
    hostInsert(textNode, container)
  }

  function patchChildren(n1, n2, container, parentComponent, anchor) {
    const { shapeFlag: prevShapeFlag, children: c1 } = n1
    const { shapeFlag, children: c2 } = n2

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        unmountedChildren(c1)
      }
      if (c1 !== c2) {
        hostSetElementText(container, c2)
      }
    } else {
      if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        hostSetElementText(container, '')
        mountChildren(c2, container, parentComponent, anchor)
      } else {
        patchKeyedChildren(c1, c2, container, parentComponent, anchor)
      }
    }
  }

  function unmountedChildren(children: any) {
    for (let i = 0; i < children.length; i++) {
      hostRemove(children[i].el)
    }
  }

  function patchKeyedChildren(c1, c2, container, parentComponent, parentAnchor) {
    const l1 = c1.length, l2 = c2.length
    let i = 0
    let e1 = l1 - 1
    let e2 = l2 - 1

    function isSameVNodeType(n1, n2) {
      return n1.type === n2.type && n1.key === n2.key
    }

    // 左端
    while (i <= e1 && i <= e2) {
      const n1 = c1[i]
      const n2 = c2[i]
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, parentComponent, parentAnchor)
      } else {
        break
      }
      i++
    }

    // 右端
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1]
      const n2 = c2[e2]
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, parentComponent, parentAnchor)
      } else {
        break
      }
      e1--
      e2--
    }

    // 增加节点
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1
        const anchor = nextPos < l2 ? c2[nextPos].el : null
        while (i <= e2) {
          patch(null, c2[i], container, parentComponent, anchor)
          i++
        }
      }
    } else if (i > e2) {
      // 删除节点
      while (i <= e1) {
        hostRemove(c1[i].el)
        i++
      }
    } else {
      // 中间对比
      let s1 = i
      let s2 = i
      // 新队列需要被 patch 的数量
      let toBePatched = e2 - s2 + 1
      // 已经 patch 的数量
      let patched = 0
      // 是否需要移动
      let moved = false
      // 移动相关
      let maxNewIndexSoFar = 0
      // 获取新队列的节点的 key
      let keyToNewIndexMap = new Map()
      // 新队列对应的旧队列的 key
      let newIndexToOldIndexMap = new Array(patched)
      for (let i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0

      // 设置新队列的 key
      for (let i = s2; i <= e2; i++) {
        const nextChild = c2[i]
        keyToNewIndexMap.set(nextChild.key, i)
      }

      for (let i = s1; i <= e1; i++) {
        const prevChild = c1[i]
        if (patched >= toBePatched) {
          hostRemove(prevChild.el)
          continue
        }

        let newIndex
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key)
        } else {
          for (let j = s2; j <= e2; j++) {
            if (isSameVNodeType(prevChild, c2[j])) {
              newIndex = j
            }
          }
        }
        if (newIndex === undefined) {
          hostRemove(prevChild.el)
        } else {
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex
          } else {
            moved = true
          }
          newIndexToOldIndexMap[newIndex - s2] = i + 1
          patch(prevChild, c2[newIndex], container, parentComponent, null)
          patched++
        }
      }

      // 获取最长递增子序列
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : []
      // 从尾部开始遍历，可以不用考虑 insertBefore 的位置
      let j = increasingNewIndexSequence.length - 1
      for (let i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = i + s2
        const nextChild = c2[nextIndex]
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : null

        // 如果没有 key
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, parentComponent, anchor)
        } else {
          // key 不在递增子序列中
          if (j < 0 || increasingNewIndexSequence[j] !== i) {
            console.log('移动位置')
            hostInsert(nextChild.el, container, anchor)
          } else {
            // key 在递增子序列中，不需要移动
            j--
          }
        }
      }
    }
  }


  return {
    createApp: createAppAPI(render)
  }
}


function getSequence(arr) {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
function updateComponentPreRender(instance, nextVNode) {
  instance.vnode = nextVNode
  instance.next = null

  instance.props = nextVNode.props
}

