/*
 * @Author: Lqf
 * @Date: 2021-12-25 19:36:12
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-30 22:10:13
 * @Description: 我添加了修改
 */
function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
        shapeFlag: getShapeFlag(type),
        el: null
    };
    if (typeof children === 'string') {
        vnode.shapeFlag |= 4 /* TEXT_CHILDREN */;
    }
    else if (Array.isArray(children)) {
        vnode.shapeFlag |= 8 /* ARRAY_CHILDREN */;
    }
    // component + children object
    if (vnode.shapeFlag & 2 /* STATEFUL_COMPONENT */) {
        if (typeof children === 'object') {
            vnode.shapeFlag |= 16 /* SLOT_CHILDREN */;
        }
    }
    return vnode;
}
function getShapeFlag(type) {
    return typeof type === 'string' ? 1 /* ELEMENT */ : 2 /* STATEFUL_COMPONENT */;
}

/*
 * @Author: Lqf
 * @Date: 2021-12-19 16:51:15
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-27 21:35:45
 * @Description: 我添加了修改
 */
const extend = Object.assign;
const isObject = (val) => {
    return val !== null && typeof val === 'object';
};
const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key);
const camelize = (str) => {
    return str.replace(/-(\w)/g, (_, c) => {
        return c ? c.toUpperCase() : '';
    });
};
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
const toHandlerKey = (str) => {
    return str ? 'on' + capitalize(str) : '';
};

/*
 * @Author: Lqf
 * @Date: 2021-12-19 13:19:28
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-26 17:11:20
 * @Description: 我添加了修改
 */
const targetMap = new Map();
function trigger(target, key) {
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);
    triggerEffects(dep);
}
function triggerEffects(dep) {
    for (const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler();
        }
        else {
            effect.run();
        }
    }
}

/*
 * @Author: Lqf
 * @Date: 2021-12-19 21:24:09
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-22 20:26:36
 * @Description: 我添加了修改
 */
const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key) {
        if (key === "__v_isReactive" /* IS_REACTIVE */) {
            return !isReadonly;
        }
        else if (key === "__v_isReadonly" /* IS_READONLY */) {
            return isReadonly;
        }
        const res = Reflect.get(target, key);
        if (shallow) {
            return res;
        }
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}
function createSetter() {
    return function set(target, key, val) {
        const res = Reflect.set(target, key, val);
        trigger(target, key);
        return res;
    };
}
const mutableHandlers = {
    get,
    set
};
const readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
        console.warn(`key:"${String(key)}" set 失败，因为 target 是 readonly 类型`, target);
        return true;
    }
};
const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
});

function reactive(raw) {
    return createReactiveObject(raw, mutableHandlers);
}
function readonly(raw) {
    return createReactiveObject(raw, readonlyHandlers);
}
function shallowReadonly(raw) {
    return createReactiveObject(raw, shallowReadonlyHandlers);
}
function createReactiveObject(target, baseHandlers) {
    if (!isObject(target)) {
        console.warn(`target ${target} 必须是对象`);
        return;
    }
    return new Proxy(target, baseHandlers);
}

/*
 * @Author: Lqf
 * @Date: 2021-12-27 21:06:02
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-27 21:36:21
 * @Description: 我添加了修改
 */
function emit(instance, event, ...args) {
    const { props } = instance;
    const handlerName = toHandlerKey(camelize(event));
    const handler = props[handlerName];
    handler && handler(...args);
}

/*
 * @Author: Lqf
 * @Date: 2021-12-27 19:07:14
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-27 19:37:55
 * @Description: 我添加了修改
 */
function initProps(instance, rawProps) {
    instance.props = rawProps || {};
}

/*
 * @Author: Lqf
 * @Date: 2021-12-29 23:25:43
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-30 22:12:03
 * @Description: 我添加了修改
 */
function initSlots(instance, children) {
    const { vnode } = instance;
    if (vnode.shapeFlag & 16 /* SLOT_CHILDREN */) {
        normalizeObjectSlots(children, instance.slots);
    }
}
function normalizeObjectSlots(children, slots) {
    for (const key in children) {
        const value = children[key];
        slots[key] = (props) => normalizeSlotValue(value(props));
    }
}
function normalizeSlotValue(value) {
    return Array.isArray(value) ? value : [value];
}

/*
 * @Author: Lqf
 * @Date: 2021-12-26 20:18:07
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-29 23:32:31
 * @Description: 我添加了修改
 */
const publicPropertiesMap = {
    $el: (i) => i.vnode.el,
    $slots: (i) => i.slots
};
const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        const { setupState, props } = instance;
        if (key in setupState) {
            return setupState[key];
        }
        if (hasOwn(setupState, key)) {
            return setupState[key];
        }
        else if (hasOwn(props, key)) {
            return props[key];
        }
        const publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
    }
};

/*
 * @Author: Lqf
 * @Date: 2021-12-25 22:45:15
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-29 23:26:48
 * @Description: 我添加了修改
 */
function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
        props: {},
        slots: {},
        children: [],
        emit: () => { }
    };
    component.emit = emit.bind(null, component);
    return component;
}
function setupComponent(instance) {
    initProps(instance, instance.vnode.props);
    initSlots(instance, instance.vnode.children);
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const Component = instance.type;
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);
    const { setup } = Component;
    if (setup) {
        const setupResult = setup(shallowReadonly(instance.props), {
            emit: instance.emit
        });
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    // function || object
    // TODO function
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    // 保证组件render有值
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    instance.render = Component.render;
}

/*
 * @Author: Lqf
 * @Date: 2021-12-25 22:40:37
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-26 22:32:30
 * @Description: 我添加了修改
 */
function render(vnode, container) {
    patch(vnode, container);
}
function patch(vnode, container) {
    const { shapeFlag } = vnode;
    // 判断是不是element
    if (shapeFlag & 1 /* ELEMENT */) {
        processElement(vnode, container);
    }
    else if (shapeFlag & 2 /* STATEFUL_COMPONENT */) {
        processComponent(vnode, container);
    }
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    const { type, props, children, shapeFlag } = vnode;
    const el = (vnode.el = document.createElement(type));
    for (const key in props) {
        const val = props[key];
        const isOn = (key) => /^on[A-Z]/.test(key);
        if (isOn(key)) {
            const event = key.slice(2).toLowerCase();
            el.addEventListener(event, val);
        }
        else {
            el.setAttribute(key, val);
        }
    }
    if (shapeFlag & 4 /* TEXT_CHILDREN */) {
        el.textContent = children;
    }
    else if (shapeFlag & 8 /* ARRAY_CHILDREN */) {
        mountChildren(vnode, el);
    }
    container.append(el);
}
function mountChildren(vnode, container) {
    vnode.children.forEach(child => {
        patch(child, container);
    });
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountComponent(initialVNode, container) {
    const instance = createComponentInstance(initialVNode);
    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
}
function setupRenderEffect(instance, initialVNode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);
    // vnode -> patch
    // vnode -> element -> mountELement
    patch(subTree, container);
    initialVNode.el = subTree.el;
}

/*
 * @Author: Lqf
 * @Date: 2021-12-25 19:25:05
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-25 23:16:57
 * @Description: 我添加了修改
 */
function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // component -> vnode
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        }
    };
}

/*
 * @Author: Lqf
 * @Date: 2021-12-26 15:34:10
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-26 16:32:26
 * @Description: 我添加了修改
 */
function h(type, props, children) {
    return createVNode(type, props, children);
}

/*
 * @Author: Lqf
 * @Date: 2021-12-29 23:36:57
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-30 22:07:39
 * @Description: 我添加了修改
 */
// 具名插槽
function renderSlots(slots, name, props) {
    const slot = slots[name];
    if (typeof slot === 'function') {
        return createVNode('div', {}, slot(props));
    }
}

export { createApp, h, renderSlots };
