fav-commands - shell utility to pick favorite commands per directory
================================================================================

Running this program will display a menu of commands associated with the current
directory.  The commands are populated from the file `.fav-commands` in the
current directory, and from the `~/.fav-commands-global` file.

The file should list commands one-per-line, with blank lines and lines
beginning with "`#`" ignored.


usage
================================================================================

    fav-commands [options]

### options

| option          | description |
|-----------------|------------------------------------------------------|
| `-h --help`     | print this help |
| `-v --version`  | print the program version |


install
================================================================================

    npm install -g @moar-things/fav-commands


license
================================================================================

This package is licensed under the MIT license.  See the
[LICENSE.md](LICENSE.md) file for more information.


contributing
================================================================================

Awesome!  We're happy that you want to contribute.

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.
