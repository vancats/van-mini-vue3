import { NodeTypes } from "./ast"
import { helperMapName, TO_DISPLAY_STRING } from "./runtimeHelpers"

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
  const VueBinging = 'vue'
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
