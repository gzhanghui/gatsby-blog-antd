const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const { generateTheme, getLessVars } = require('antd-theme-generator')

const themeVariables = getLessVars(
  path.join(__dirname, './src/common/less/variables.less')
)
const defaultVars = getLessVars(
  './node_modules/antd/lib/style/themes/default.less'
)
const darkVars = {
  ...getLessVars('./node_modules/antd/lib/style/themes/dark.less'),
  '@primary-color': defaultVars['@primary-color'],
  '@picker-basic-cell-active-with-range-color': 'darken(@primary-color, 20%)',
}
const lightVars = {
  ...getLessVars('./node_modules/antd/lib/style/themes/compact.less'),
  '@primary-color': defaultVars['@primary-color'],
}
fs.writeFileSync('./src/theme/dark.json', JSON.stringify(darkVars))
fs.writeFileSync('./src/theme/light.json', JSON.stringify(lightVars))
fs.writeFileSync('./src/theme/theme.json', JSON.stringify(themeVariables))

const options = {
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './src'), // all files with .less extension will be processed
  varFile: path.join(__dirname, './src/common/less/variables.less'), // default path is Ant Design default.less file
  outputFilePath: path.join(__dirname, './public/static/color.less'), // if provided, file will be created with generated less/styles
  themeVariables: Array.from(
    new Set([
      ...Object.keys(darkVars),
      ...Object.keys(lightVars),
      ...Object.keys(themeVariables),
    ])
  ),
  customColorRegexArray: [/^fade\(.*\)$/], // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
}

generateTheme(options)
  .then(less => {
    console.log(chalk.red.green('🌈😏Theme generated successfully🔥'))
  })
  .catch(error => {
    console.log(chalk.red(`🙁Error', ${error}`))
  })
