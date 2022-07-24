import chalk from "chalk";

const info = chalk.green.bold;
const warning = chalk.yellow.bold;
const error = chalk.red.bold;
const degub = chalk.blue;

const logging = {
    info,
    warning,
    error,
    degub
};

export default logging;