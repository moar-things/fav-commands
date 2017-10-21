'use strict'

exports.run = run

const blessed = require('blessed')
const FavCommands = require('../fav-commands')

// Create a screen object.
function run (favCommands) {
  const screen = blessed.screen({
    smartCSR: true
  })

  screen.title = `${FavCommands.appName} ${FavCommands.version}`

  const box = blessed.box({
    top: 1,
    left: 1,
    width: '100%',
    height: '75%',
    content: screen.title,
    style: {
      fg: 'black',
      bg: 'green'
    }
  })

  const list = blessed.list({
    parent: box,
    top: 1,
    left: 0,
    width: '100%',
    height: '100%',
    fg: 'black',
    bg: 'white',
    label: screen.title,
    items: favCommands,
    keys: true,
    mouse: true,
    invertSelected: true,
    interactive: true,
    style: {
      item: {
        fg: 'black',
        bg: 'white'
      },
      selected: {
        fg: 'white',
        bg: 'blue',
        bold: true
      }
    }
  })

  screen.append(box)

  list.on('select', function listItemSelected (data) {
    setImmediate(sendCommandSelected, screen, favCommands[list.selected])
  })

  screen.key(['escape', 'q', 'C-c'], function screenCancelled (ch, key) {
    setImmediate(sendCommandSelected, screen, 'echo "no command selected"')
  })

  // Focus our element.
  list.focus()

  // Render the screen.
  screen.render()
}

function sendCommandSelected (screen, command) {
  screen.destroy()
  setTimeout(() => console.error(command), 100)
  setTimeout(() => process.exit(0), 300)
}
