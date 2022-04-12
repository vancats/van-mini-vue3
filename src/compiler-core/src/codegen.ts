import { isString } from "../../share"
import { NodeTypes } from "./ast"
import { CREATE_ELEMENT_VNODE, helperMapName, TO_DISPLAY_STRING } from "./runtimeHelpers"

export function generate(ast) {
  const context = createCodegenContext()
  const { push } = context

  if (ast.helpers.length > 0) {
    genFunctionPreamble(ast, context)
  }

  push('return ')
  const functionName = 'render'
  const args = ['_ctx, _cache']
  const signature = args.join(', ')

  push(`function ${functionName}(${signature}) {`)

  push(' return ')
  genNode(ast.codegenNode, context)
  push(' }')

  return {
    code: context.code
  }
}

function genFunctionPreamble(ast: any, context) {
  const { push } = context
  const VueBinging = 'Vue'
  const aliasHelpers = (s) => `${helperMapName[s]}: _${helperMapName[s]}`
  push(`const { ${ast.helpers.map(aliasHelpers).join(', ')} } = ${VueBinging} `)
  push('\n')
}

function createCodegenContext() {
  const context = {
    code: '',
    push(source) {
      context.code += source
    },
    helper(key) {
      return `_${helperMapName[key]}`
    }
  }
  return context
}

function genNode(node: any, context) {
  switch (node.type) {
    case NodeTypes.TEXT:
      genText(node, context)
      break
    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context)
      break
    case NodeTypes.SIMPLE_EXPRESSION:
      genExpression(node, context)
      break
    case NodeTypes.ELEMENT:
      genElement(node, context)
      break
    case NodeTypes.COMPOUND_EXPRESSION:
      genCompoundExpression(node, context)
      break
    default:
      break
  }
}

function genText(node: any, context: any) {
  const { push } = context
  push(`'${node.content}'`)
}

function genInterpolation(node: any, context: any) {
  const { push, helper } = context
  push(`${helper(TO_DISPLAY_STRING)}(`)
  genNode(node.content, context)
  push(`)`)
}

function genExpression(node: any, context: any) {
  const { push } = context
  push(`${node.content}`)
}

function genElement(node: any, context: any) {
  const { push, helper } = context
  const { tag, children, props } = node
  console.log('props: ', props)
  push(`${helper(CREATE_ELEMENT_VNODE)}(`)
  genNodeList(genNullable([tag, props, children]), context)
  // genNullable([tag, props, children])
  // genNode(children, context)

  push(')')
}
function genCompoundExpression(node: any, context: any) {
  const { push } = context
  const { children } = node

  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (isString(child)) {
      push(child)
    } else {
      genNode(child, context)
    }
  }
}

function genNullable(args: any[]) {
  return args.map(arg => arg || "null")
}

function genNodeList(nodes, context) {
  const { push } = context
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (isString(node)) {
      push(node)
    } else {
      genNode(node, context)
    }

    if (i < nodes.length - 1) {
      push(', ')
    }
  }
}

