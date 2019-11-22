const schedule = require('node-schedule');
const { fileServer } = require("./tools");
const juejinTask = require("./tasks/juejin");
const nbaTask = require("./tasks/nba");


const mainTask = async () => {
  const res = await Promise.all([juejinTask(), nbaTask()])
  fileServer.write(JSON.stringify(res))
}

schedule.scheduleJob('57 * * * *', function () {
  mainTask()
});

