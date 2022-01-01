/*
 * @Author: Lqf
 * @Date: 2021-12-29 23:18:10
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-01 16:11:35
 * @Description: 我添加了修改
 */
import { createRenderer } from "../../lib/mini-vue.esm.js";
import { App } from "./App.js";

console.log(PIXI)

const game = new PIXI.Application({
  width: 500,
  height: 500
})

document.body.append(game.view)

const renderer = createRenderer({
  createElement (type) {
    switch (type) {
      case 'rect':
        const rect = new PIXI.Graphics()
        rect.beginFill(0xff0000)
        rect.drawRect(0, 0, 100, 100)
        rect.endFill()
        return rect
    }
  },
  patchProp (el, key, val) {
    el[key] = val
  },
  insert (el, parent) {
    parent.addChild(el)
  }
})

renderer.createApp(App).mount(game.stage)