// TO START TYPE IN TERMINAL: node app.js --add='task', --remove='task name or task id', or --list

const parseArgs = require("minimist");
const handleCommand = require("./handleCommand");

const command = parseArgs(process.argv.slice(2, 3));
delete command._;

handleCommand(command);
