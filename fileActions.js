const chalk = require('chalk');
const fs = require('fs');
const util = require('util');
const path = require('path');
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

const folderExists = (outputPath) => {
  try {
    return fs.lstatSync(outputPath).isDirectory();
  } catch (_) {
    return false;
  }
};

const fileExists = (file) => {
  try {
    return fs.existsSync(file);
  } catch (_) {
    return false;
  }
};

const createFile = async (outputPath, data) => {
  if (folderExists(outputPath)) {
    const file = path.join(outputPath, 'stats.txt');
    if (fileExists(file)) {
      console.log(chalk.green(`File exists.\nSee here: ${file}`));
      return file;
    }
    await writeFileAsync(file, data, 'utf8');
    console.log(
      chalk.green(`Successfully generated the stats file.\nSee here: ${file}`)
    );
    return file;
  } else {
    console.log(chalk.red('Invalid folder path, please try again.'));
    return '';
  }
};

const appendFile = async (file, data) => {
  if (fileExists(file)) {
    await appendFileAsync(file, data, 'utf8');
    console.log(chalk.green(`${data} added to list`));
    return true;
  } else {
    console.log(chalk.red('Failed to add stat.'));
    return false;
  }
};

const readFile = (file) => {
  return fs.readFileSync(file, 'utf8');
};

module.exports = {
  appendFile,
  createFile,
  readFile,
};
