const handleData = require("./handleData");

const handleCommand = ({ add, remove, list }) => {
  // console.log(add, remove, list);
  if (add) {
    if (typeof add !== "string") {
      return console.log("Text only".red);
    } else if (add.length < 6) {
      return console.log("Task too short (min. 6 chars)".red);
    }

    handleData(1, add);
  } else if (remove) {
    if (remove.length < 6) {
      return console.log("Incorrect name or task id (min. 6 characters)".red);
    }

    handleData(2, remove);
  } else if (list || list === "") {
    handleData(3, null);
  } else {
    console.log(
      "Unknown property. Use --add='task', --remove='task', or --list".red
    );
  }
};

module.exports = handleCommand;
