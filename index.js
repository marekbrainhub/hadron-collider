const inquirer = require('inquirer');
const ejs = require('ejs');

const fs = require('fs-extra');
const path = require('path');

const cwd = process.cwd();

const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Project name:',
    validate: (input) => {
      if(/^([A-Za-z\-\_\d])+$/.test(input)) {
        return true;
      } else {
        return 'Project name can only include letters, nubmers, underscores and hyphens.';
      }
    },
  },
  {
    type: 'confirm',
    name: 'typescript',
    message: 'Do you want TypeScript support?',
    default: false,
  },
  {
    type: 'checkbox',
    name: 'packages',
    message: 'Select features:',
    choices: [
      { name: 'hadron-express', checked: true },
      { name: 'hadron-typeorm' },
      { name: 'hadron-validation' },
    ]
  }
];

//*
inquirer.prompt(questions).then(answers => {
  createDirectoryContents('./templates', './dist', answers);
  clearEmptyFiles('./dist');
});
//*/

function createDirectoryContents(templatePath, projectPath, data) {
  // Generate a list of files from the template path.
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    // Convert file names from .ejs templates to .js.
    let newFile = file.split('.ejs').join('');

    const templateFilePath = path.resolve(templatePath, file);

    const stats = fs.statSync(templateFilePath);

    // If the file is not a directory, compile ejs and copy the content.
    if (stats.isFile()) {
      const contents = fs.readFileSync(templateFilePath, 'utf-8');
      const compiled = ejs.render(contents, data);
      const writePath = path.resolve(cwd, projectPath, newFile);
      fs.writeFileSync(writePath, compiled, 'utf-8');
    // If the file is a directory, create a new directory and recursively apply this function to it.
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.resolve(cwd, projectPath, file));
      createDirectoryContents(path.resolve(templatePath, file), path.resolve(projectPath, file), data);
    }
  });
}

function clearEmptyFiles(projectPath) {
  const filesToCheck = fs.readdirSync(projectPath);

  filesToCheck.forEach(file => {
    const filePath = path.resolve(projectPath, file);
    const stats = fs.statSync(filePath);

    if(stats.size == 0) {
      fs.unlinkSync(filePath);
    }
    
    // If the file is a directory, apply this function recursively and if there
    // are no files remaining, delete the directory.
    if(stats.isDirectory()) {
      clearEmptyFiles(filePath);
      const files = fs.readdirSync(filePath);
      if(files.length === 0) {
        fs.rmdirSync(filePath);
      }
    }
  })
}
