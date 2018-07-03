const inquirer = require('inquirer')

const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

const { createDirectoryContents, clearEmptyFiles } = require('./utils');
const questions = require('./questions');

const pwd = process.cwd();

inquirer.prompt(questions).then(answers => {
  console.log('Creating the project directory...');
  const projectPath = path.resolve(pwd, answers.projectName);
  fs.mkdirSync(projectPath);

  console.log('Copying template files into the project directory...');
  createDirectoryContents('./templates', projectPath, answers);

  console.log('Removing residual files...');
  clearEmptyFiles(projectPath);

  if (answers.packageManager === 'npm') {
    console.log('Running npm install...');
    exec(`npm install --prefix ${answers.projectName}`);
  } else if (answers.packageManager === 'yarn') {
    console.log('Running yarn...');
    exec(`yarn install --cwd ${answers.projectName}`);
  }

  console.log('\nDone!\n');
  console.log('You can now enter your project and start development:\n');
  console.log(`   cd ${answers.projectName} && npm install`);
  console.log('   npm run dev');
  console.log('\n\n');
});
