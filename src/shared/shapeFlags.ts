/*
 * @Author: Lqf
 * @Date: 2021-12-26 21:24:43
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-30 22:11:00
 * @Description: 我添加了修改
 */

export const enum ShapeFlags {
  ELEMENT = 1, // 0001
  STATEFUL_COMPONENT = 1 << 1, // 0010
  TEXT_CHILDREN = 1 << 2, // 0100
  ARRAY_CHILDREN = 1 << 3, // 1000
  SLOT_CHILDREN = 1 << 4
}
