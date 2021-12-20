<!--
 * @Author: Lqf
 * @Date: 2021-12-19 12:47:00
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-20 23:09:35
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

### 二、实现effect,reactive
  1. 添加 lib
  2. reactive 的get, set代理
  3. effect 的自执行,以及track,trigger的依赖收集

### 三、添加effect返回值runner

### 四、添加effect参数scheduler,设置延迟执行

### 五、添加effect的stop功能
  1. stop时删除依赖
  2. 添加active与onStop

### 六、添加readonly
  1. 重构get,set逻辑--baseHandler
  2. 测试中使用jest.fn

### 七、添加isReactive和isReadonly函数

### 八、优化stop
  1. 优化get(track), set(trigger)逻辑

### 九、reactive&readonly嵌套


