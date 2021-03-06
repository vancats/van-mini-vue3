<!--
 * @Author: Lqf
 * @Date: 2021-12-19 12:47:00
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-09 20:53:43
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

### 十、添加shallowReadonly

### 十一、添加isProxy(是否reactive|readonly)

### 十二、添加ref
  1. 创建RefImpl类,实现value取值
  2. 重构track, trigger,抽离逻辑
  3. 进行ref的object对比,完成reactive嵌套

### 十三、isRef&unRef

### 十四、proxyRefs
  1. get时无需取value,如template与setup值的联系
  2. set时当值为ref直接替换

### 十五、computed
  1. 新建ComputedRefImpl类
  2. 添加_dirty参数实现缓存功能
  3. 调用ReactiveEffect实现getter响应式
  4. 通过scheduler功能实现_dirty更新

### 十六、init component
  1. mount
  2. createVNode 创建vnode
  3. render(vnode, rootContainer)
  4. patch -> processComponent -> mountComponent
  5. createComponentInstance
  6. setupComponent(instance) -> initProps/initSlots
  7. setupStatefulComponent
  8. handleSetupResult
  9. finishComponentSetup
  10. setupRenderEffect -> subTree = instance.render
  11. patch(subTree, container)

### 十七、rollup打包
  1. 引入rollup,配置rollup.config.js
  2. 解析typescript @rollup/plugin-typescript
  3. 修改package人口文件

### 十八、init element
  1. patch -> processElement -> mountELement
  2. createElement
  3. patchProp
  4. mountChildren

### 十九、component proxy
  1. setupState代理
  2. $el代理
  3. publicPropertiesMap代理对象

### 二十、ShapeFlags
  1. 增加ShapeFlags枚举项
  2. 通过位运算计算vnode的shapeFlag
   
### 二十一、事件注册

### 二十二、component props

### 二十三、component emit
  1. 组件注册emit函数
  2. 驼峰命名转化

### 二十四、slot
  1. 增加slot选项
  2. 实现数组形式插槽
  3. 实现对象形式插槽
  4. 实现具名插槽
  5. 实现作用域插槽

### 二十五、Fragment & Text

### 二十六、getCurrentInstance

### 二十七、provide & inject
  1. 实例获取,组件增加provides选项
  2. 默认获取父组件provides
  3. 初始化,断原型链
  4. inject默认值处理

### 二十八、custom renderer
  1. 重构renderer,实现接口封装
  2. 实现自定义渲染器
  3. 基于PIXI.js实现canvas渲染

### 二十九、update流程搭建
  1. 使用proxyRefs代理setupResult
  2. 采用effect进行依赖收集与更新

### 三十、patchProps 修改与删除

### 三十一、patchChildren
  1. Text -> Text
  2. Text -> Array
  3. Array -> Text
  4. 双端对比

### 三十二、patchChildren 
  1. Array -> Array
  2. 最长递增子序列

### 三十三、updateComponent
  1. 更新组件props
  2. 调用组件render函数
  3. shouldUpdateComponent

### 三十四、实现nextTick