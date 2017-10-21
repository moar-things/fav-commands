'use strict'

exports.getFavCommands = getFavCommands

const os = require('os')
const fs = require('fs')
const path = require('path')

function getFavCommands () {
  const globalFavs = path.join(os.homedir(), '.fav-commands-global')
  let favs = readLines('.fav-commands')
  favs = favs.concat(readLines(globalFavs))

  return favs
}

function readLines (fileName) {
  let content
  try {
    content = fs.readFileSync(fileName, 'utf8')
  } catch (err) {
    return []
  }

  return content.split('\n')
}
