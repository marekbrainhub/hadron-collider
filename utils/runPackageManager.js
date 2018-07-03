const { exec } = require('child_process');

module.exports = function(pm, dir) {
  return new Promise(resolve => {
    let child;
    if (pm === 'npm') {
      child = exec(`npm install --prefix ${dir}`, resolve);
    } else if (pm === 'yarn') {
      child = exec(`yarn --cwd ${dir}`, resolve);
    }

    child.stdout.pipe(process.stdout);
  });
};

