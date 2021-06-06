const chalk = require('chalk');
const prompts = require('./prompts');
const fileActions = require('./fileActions');

Array.prototype.max = function () {
  return Math.max.apply(null, this);
};

Array.prototype.min = function () {
  return Math.min.apply(null, this);
};

const startApp = async () => {
  let file = '';
  console.log(chalk.magenta(`Welcome.`));

  while (true) {
    const { selection } = file
      ? await prompts.primarySelectionPrompt()
      : await prompts.primarySelectionPromptEntry();
    switch (selection) {
      case 'Set path':
        // prompt for path to place the text file.
        const { answer: outputPath } = await prompts.promptInputMessage(
          'Please enter output path:'
        );
        file = await fileActions.createFile(outputPath, '');
        break;
      case 'Add':
        const { stat } = await prompts.promptStat();
        if (stat) {
          await fileActions.appendFile(file, `${stat}\n`);
        } else {
          console.log(chalk.red('Invalid input, please try again.'));
        }
        break;
      case 'Summary':
        const data = fileActions.readFile(file);
        const lines = data
          .trim()
          .split(/\r?\n/)
          .map((item) => {
            return parseFloat(item);
          });

        const sum = lines.reduce((a, b) => a + b, 0);
        const avg = sum / lines.length || 0;

        console.log('+-----------------+--------+');
        console.log(
          `| # of Entries    |${('     ' + lines.length).slice(-5)}   |`
        );
        console.log(
          `| Min. value      |${('     ' + lines.min().toFixed(2)).slice(-8)}|`
        );
        console.log(
          `| Max. value      |${('     ' + lines.max().toFixed(2)).slice(-8)}|`
        );
        console.log(
          `| Avg. value      |${('     ' + avg.toFixed(2)).slice(-8)}|`
        );
        console.log('+-----------------+--------+');
        break;
      case 'Help':
        console.log(
          chalk.green(
            'This program will allow numeric values to be recorded into a text file and allow a summary of the values to be printed.'
          )
        );
        break;
      case 'Exit':
        console.log(chalk.magenta('Bye bye.'));
        return;
      default:
    }
  }
};

startApp();
