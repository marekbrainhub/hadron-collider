#!/usr/bin/env node

const inquirer = require('inquirer');

const fs = require('fs-extra');
const path = require('path');

const {
  createDirectoryContents,
  clearEmptyFiles,
  runPackageManager,
  runLinter,
} = require('./utils');

const questions = require('./questions');

const pwd = process.cwd();

inquirer.prompt(questions).then(async answers => {
  console.log('Creating the project directory...');
  const projectPath = path.resolve(pwd, answers.projectName);
  fs.mkdirSync(projectPath);

  console.log('Copying template files into the project directory...');
  createDirectoryContents(path.resolve(__dirname, 'templates'), projectPath, answers);

  console.log('Removing residual files...');
  clearEmptyFiles(projectPath);

  if (answers.packageManager !== 'none') {
    console.log('Running pacakge manager...\n');
    await runPackageManager(answers.packageManager, answers.projectName);
  }

  if (answers.linter !== 'none' && answers.packageManager !== 'none') {
    console.log('Runing linter...');
    await runLinter(answers.projectName);
  }

  console.log('\nDone!\n');
  console.log('You can now enter your project and start development:\n');
  console.log(`   cd ${answers.projectName}`);
  console.log('   npm run dev');
  console.log('\n');
});
