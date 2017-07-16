
'use strict';


const exec = require('child_process').execSync;


/**
 * @param {string} commands
 * Generator keys for token strategy - module RSA
 * The order of commands are important to execution
 */
const generator = (commands) => {
  exec(commands);
  commands.splice(0, 1);
  if (commands.length <= 0) return;
  generator(commands);
}


module.exports = generator;
