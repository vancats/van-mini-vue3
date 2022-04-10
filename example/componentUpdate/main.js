import { createApp } from '../../lib/mini-vue.esm.js'
import { App } from './App.js'

const root = document.querySelector('#app')
createApp(App).mount(root)