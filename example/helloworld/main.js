/*
 * @Author: Lqf
 * @Date: 2021-12-25 19:26:26
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-26 15:45:36
 * @Description: 我添加了修改
 */


import { createApp } from '../../lib/mini-vue.esm.js'
import { App } from './app.js'

const rootContainer = document.querySelector('#app')
createApp(App).mount(rootContainer)