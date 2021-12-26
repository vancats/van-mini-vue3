/*
 * @Author: Lqf
 * @Date: 2021-12-25 19:36:12
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-26 22:07:41
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
    return vnode;
}
function getShapeFlag(type) {
    return typeof type === 'string' ? 1 /* ELEMENT */ : 2 /* STATEFUL_COMPONENT */;
}

/*
 * @Author: Lqf
 * @Date: 2021-12-26 20:18:07
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-26 20:29:16
 * @Description: 我添加了修改
 */
const publicPropertiesMap = {
    $el: (i) => i.vnode.el
};
const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        const { setupState } = instance;
        if (key in setupState) {
            return setupState[key];
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
 * @LastEditTime: 2021-12-26 22:05:36
 * @Description: 我添加了修改
 */
function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
    };
    return component;
}
function setupComponent(instance) {
    // TODO
    // initProps
    // initSlots
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const Component = instance.type;
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);
    const { setup } = Component;
    if (setup) {
        const setupResult = setup();
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
 * @LastEditTime: 2021-12-26 22:07:20
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
        el.setAttribute(key, val);
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

export { createApp, h };
