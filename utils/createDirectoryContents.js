const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');

const pwd = process.cwd();

module.exports = function createDirectoryContents(templatePath, projectPath, data) {
  // Generate a list of files from the template path.
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    // Convert file names from .ejs templates to .js.
    const newFile = file.split('.ejs').join('');

    const templateFilePath = path.resolve(templatePath, file);

    const stats = fs.statSync(templateFilePath);

    // If the file is not a directory, compile ejs and copy the content.
    if (stats.isFile()) {
      const contents = fs.readFileSync(templateFilePath, 'utf-8');
      let compiled
      try {
        compiled = ejs.render(contents, data);
      } catch(e) {
        console.log(e);
        console.log('In file: ', templateFilePath);
      }
      const writePath = path.resolve(pwd, projectPath, newFile);
      fs.writeFileSync(writePath, compiled, 'utf-8');
    // If the file is a directory, create a new directory and recursively apply this function to it.
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.resolve(pwd, projectPath, file));
      createDirectoryContents(path.resolve(templatePath, file), path.resolve(projectPath, file), data);
    }
  });
};

