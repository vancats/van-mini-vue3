// Invoked on the commit-msg git hook by yorkie.
const msgPath = process.argv[2]
const msg = require('fs')
  .readFileSync(msgPath, 'utf-8')
  .trim()

const chalk = require('chalk')

const commitRE = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|build|chore|release)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      'invalid commit message format.',
    )}\n\n${chalk.red(
      '  Proper commit message format is required for automated changelog generation. Examples:\n\n',
    )
    }    ${chalk.green('feat(form): add \'validate\' option')}\n`
    + `    ${chalk.green('fix(select): handle events on blur')}\n`,
  )
  process.exit(1)
}
