#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')

const minimist = require('minimist')

const pkg = require('./package.json')
const favs = require('./lib/favs')
const menu = require('./lib/menu')

exports.appName = path.basename(pkg.name)
exports.version = pkg.version

// run from the command-line
function run () {
  const minimistOpts = {
    string: ['timeStart', 'timeEnd', 'region'],
    boolean: ['help', 'version'],
    alias: {
      d: 'duration',
      s: 'sampling',
      h: 'help',
      v: 'version'
    }
  }

  const argv = minimist(process.argv.slice(2), minimistOpts)

  // check for help and version options
  if (argv.version) version()
  if (argv.help) help()

  const favCommands = favs.getFavCommands()
  if (favCommands.length === 0) {
    favCommands.push('# no .fav-commands found')
  }

  menu.run(favCommands)
}

// print version and exit
function version () {
  console.log(pkg.version)
  process.exit(0)
}

// print help and exit
function help () {
  console.log(getHelp())
  process.exit(1)
}

// get help text
function getHelp () {
  const helpFile = path.join(__dirname, 'HELP.md')
  let helpText = fs.readFileSync(helpFile, 'utf8')

  helpText = helpText.replace(/%%program%%/g, exports.appName)
  helpText = helpText.replace(/%%version%%/g, pkg.version)
  helpText = helpText.replace(/%%description%%/g, pkg.description)
  helpText = helpText.replace(/%%homepage%%/g, pkg.homepage)

  return helpText
}

if (require.main === module) run()
