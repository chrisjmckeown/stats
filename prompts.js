const inquirer = require('inquirer');

const primarySelectionPromptEntry = () => {
  return inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'selection',
      choices: ['Set path', 'Help', 'Exit'],
    },
  ]);
};

const primarySelectionPrompt = () => {
  return inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'selection',
      choices: ['Add', 'Summary', 'Set path', 'Help', 'Exit'],
    },
  ]);
};

const promptInputMessage = (mesage) => {
  return inquirer.prompt([
    {
      type: 'input',
      message: mesage,
      name: 'answer',
    },
  ]);
};

const promptStat = () => {
  return inquirer.prompt([
    {
      type: 'input',
      message: 'Please enter stat(s):',
      name: 'stat',
      validate: (value) => {
        if (isNaN(value) === false && value > 1) {
          return true;
        }
        return false;
      },
    },
  ]);
};

module.exports = {
  promptStat,
  promptInputMessage,
  primarySelectionPrompt,
  primarySelectionPromptEntry,
};
