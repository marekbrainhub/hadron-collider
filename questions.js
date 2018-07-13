module.exports = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Project name:',
    validate: input => {
      if (/^([A-Za-z\-_\d])+$/.test(input)) {
        return true;
      } else {
        return 'Project name can only include letters, nubmers, underscores and hyphens.';
      }
    },
  },
  {
    type: 'checkbox',
    name: 'packages',
    message: 'Select features:',
    choices: [
      { name: 'hadron-express', checked: true },
      { name: 'hadron-validation' },
      { name: 'hadron-typeorm' },
      { name: 'hadron-events' },
    ],
  },
  {
    type: 'list',
    name: 'linter',
    message: 'What config of ESLint do you want to use?',
    choices: ['brainhub', 'standard', 'airbnb', 'none'],
  },
  {
    type: 'confirm',
    name: 'babel',
    message: 'Do you want to initialize Babel?',
    default: false,
  },
  {
    type: 'list',
    name: 'packageManager',
    message: 'What package manager do you want to use to install dependencies?',
    choices: ['yarn', 'npm', 'none'],
  },
];

