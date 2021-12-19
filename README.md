<!--
 * @Author: Lqf
 * @Date: 2021-12-19 12:47:00
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-19 12:58:51
 * @Description: 我添加了修改
-->

### 一、单元测试
  1. 安装typescript 
    - yarn add typescript --dev
    - npx tsc --init 添加配置文件
  2. 安装jest
    - yarn add jest @types/jest --dev
    - "types": ["jest"] 添加tsconfig配置
  3. 安装babel
    - yarn add --dev babel-jest @babel/core @babel/preset-env
    - yarn add --dev @babel/preset-typescript
  4. 配置babel.config.js