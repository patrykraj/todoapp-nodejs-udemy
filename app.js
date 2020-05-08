// TO START TYPE IN TERMINAL: --add='task', --remove='task name or task id', or --list

// console.log(process.argv.slice(2, 3));

const parseArgs = require("minimist");
const colors = require("colors");
const fs = require("fs");

const command = parseArgs(process.argv.slice(2, 3));
delete command._;
// console.log(command);

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

const handleData = (type, title) => {
  //type - number (1 - add; 2 - remove; 3 - list)
  //title (string || null)

  // const data = fs.readFileSync("datadb.json", "utf8");
  const data = fs.readFileSync("datadb.json");
  const tasks = JSON.parse(data);
  // console.log(tasks);

  if (type === 1 || type === 2) {
    isExisted = tasks.find((task) => task.title === title) ? true : false;
    isExistedById = tasks.find((task) => task.id === title) ? true : false;

    if (type === 1 && isExisted)
      return console.log("Task already on the list".red);
    if (type === 2 && !isExisted && !isExistedById)
      return console.log("Cannot remove - task does not exist".red);
  }

  let dataJSON = "";
  switch (type) {
    case 1:
      console.log(`Adding task: ${title}`.white.bgGreen);
      const id = Math.floor(Math.random() * 900000 + 100000);
      tasks.push({ id, title });

      dataJSON = JSON.stringify(tasks);
      fs.writeFileSync("datadb.json", dataJSON);
      break;

    case 2:
      console.log("Removing task...");

      const updateTasks = tasks.filter((task) => {
        if (typeof title === "string" && task.title !== title) return task;
        else if (typeof title === "number" && task.id !== title) return task;
        else return null;
      });

      dataJSON = JSON.stringify(updateTasks);
      fs.writeFile("datadb.json", dataJSON, "utf8", (err) => {
        if (err) throw err;
        console.log(`${title} has been removed`.yellow);
      });

      break;

    default:
      console.log(
        tasks.length
          ? `\nRemaining ${tasks.length} tasks to do:`
          : "\nYou got nothing left to do"
      );
      if (tasks.length) {
        tasks.map((task, id) => {
          if (id % 2 == 0) console.log(`${task.title} id: ${task.id}`.blue);
          else console.log(`${task.title} id: ${task.id}`.green);
        });
      }
      break;
  }
};

handleCommand(command);
