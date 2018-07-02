const inquirer = require('inquirer');

const fs = require('fs-extra');
const path = require('path');

const { createDirectoryContents, clearEmptyFiles } = require('./utils');
const questions = require('./questions');

const pwd = process.cwd();

inquirer.prompt(questions).then(answers => {
  const projectPath = path.resolve(pwd, answers.projectName);
  fs.mkdirSync(projectPath);
  createDirectoryContents('./templates', projectPath, answers);
  clearEmptyFiles(projectPath);
});
