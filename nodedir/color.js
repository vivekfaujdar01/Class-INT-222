import chalk from 'chalk';
import readline from 'readline';
// const chalk = require('chalk');
// Chalk v5+ is ESM-only (uses import).
// Chalk v4 supports CommonJS (uses require). Use v4 if your project is CommonJS or you prefer require().
// Install Chalk v4: npm i chalk@4
// Use CommonJS require: const chalk = require('chalk')
// Remove or avoid "type": "module" in your package.json (or rename file to .cjs) so Node treats files as CommonJS.
// Run: node color.js
// console.log(chalk.blue('Hello, World!'));
// console.log(chalk.green('This message is green.'));
// console.log(chalk.red(chalk.bold('This message is bold red.')));

let choice = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
choice.question('Enter an arithmetic operator (+, -, *, /, %, **, //): ', (choice) => {
  switch(choice.trim()) {
    case '+':
      console.log(chalk.yellow("5 + 3 = ") + (5 + 3));
      break;
    case '-':
      console.log(chalk.yellow("5 - 3 = ") + (5 - 3));
      break;
    case '*':
      console.log(chalk.yellow("5 * 3 = ") + (5 * 3));
      break;
    case '/':
      console.log(chalk.yellow("5 / 3 = ") + (5 / 3));
      break;
    case '%':
      console.log(chalk.yellow("5 % 3 = ") + (5 % 3));
      break;
    case '**':
      console.log(chalk.yellow("5 ** 3 = ") + (5 ** 3));
      break;
    case '//':
      console.log(chalk.yellow("5 // 3 = ") + Math.floor(5 / 3));
      break;
    default:
      console.log(chalk.red("Invalid operator!"));
      break;
  }
  choice.close();
});