/*
 * @Author: Lqf
 * @Date: 2021-12-29 23:18:01
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-29 23:19:03
 * @Description: 我添加了修改
 */
import { createApp } from "../../lib/mini-vue.esm.js";
import { App } from "./App.js";

const rootContainer = document.querySelector("#app");
createApp(App).mount(rootContainer);
