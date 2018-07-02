const fs = require('fs-extra');
const path = require('path');

module.exports = function clearEmptyFiles(projectPath) {
  const filesToCheck = fs.readdirSync(projectPath);

  filesToCheck.forEach(file => {
    const filePath = path.resolve(projectPath, file);
    const stats = fs.statSync(filePath);

    if (stats.size === 0) {
      fs.unlinkSync(filePath);
    }

    // If the file is a directory, apply this function recursively and if there
    // are no files remaining, delete the directory.
    if (stats.isDirectory()) {
      clearEmptyFiles(filePath);
      const files = fs.readdirSync(filePath);
      if (files.length === 0) {
        fs.rmdirSync(filePath);
      }
    }
  });
};
