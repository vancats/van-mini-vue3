/*
 * @Author: Lqf
 * @Date: 2022-01-09 16:10:58
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-09 16:13:39
 * @Description: 我添加了修改
 */

export function shouldUpdateComponent(prevVNode, nextVNode) {
  const { props: prevProps } = prevVNode
  const { props: nextProps } = nextVNode

  for (const key in nextProps) {
    if (nextProps[key] !== prevProps[key]) {
      return true
    }
  }

  return false
}