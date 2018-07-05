const { exec } = require('child_process');
const path = require('path');

module.exports = function(dir) {
  return new Promise(resolve => {
    const ESLINT_PATH = path.resolve(dir, 'node_modules', 'eslint', 'bin', 'eslint.js');
    const CONFIG_PATH = path.resolve(dir, '.eslintrc');
    const IGNORE_PATH = path.resolve(dir, '.eslintignore');

    const command = `${ESLINT_PATH} --config ${CONFIG_PATH} --ignore-path ${IGNORE_PATH} --fix ${dir}`;

    console.log(command);
    const child = exec(command, resolve);
    child.stdout.pipe(process.stdout);
  });
};

