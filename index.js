#!/usr/bin/env node

const inquirer = require('inquirer');
const camelCase = require('camelcase');

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
  answers.camelCasePackages = answers.packages.map(el => camelCase(el));

  console.log('Creating the project directory...');

  let projectPath = path.resolve(pwd, answers.projectName);
  fs.mkdirSync(projectPath);
  if (answers.babel === 'import') {
    projectPath = path.resolve(projectPath, 'src');
    fs.mkdirSync(projectPath);
  }

  console.log('Copying template files into the project directory...');
  createDirectoryContents(path.resolve(__dirname, 'templates'), projectPath, answers);

  console.log('Removing residual files...');
  clearEmptyFiles(projectPath);

  console.log('Unpacking babel...');
  projectPath = path.resolve(projectPath, '..');
  const babelPath = path.resolve(__dirname, 'babel-templates');
  const filesToCreate = fs.readdirSync(babelPath);
  filesToCreate.forEach(file => {
    fs.copyFileSync(path.resolve(babelPath, file), path.resolve(projectPath, file));
  });
  fs.moveSync(path.resolve(projectPath, 'src', 'package.json'), path.resolve(projectPath, 'package.json'));

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
