/*
 * @Author: Lqf
 * @Date: 2021-12-25 23:51:43
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-26 16:50:56
 * @Description: 我添加了修改
 */

import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

export default {
  input: './src/index.ts',
  output: [
    // 1. cjs 2. esm
    {
      format: 'cjs',
      file: pkg.main
    },
    {
      format: 'es',
      file: pkg.module
    }
  ],
  plugins: [
    typescript()
  ]
}