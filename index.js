const schedule = require('node-schedule');
const shell = require('shelljs');
const { fileServer } = require("./tools");
const juejinTask = require("./tasks/juejin");
const nbaTask = require("./tasks/nba");


const mainTask = async () => {
  const res = await Promise.all([juejinTask(), nbaTask()])
  fileServer.write(JSON.stringify(res))
}

//每日早上9:30分定时执行一次:
schedule.scheduleJob('00 30 9 * * *', async () => {
  await mainTask()
  shell.exec(`git add .`)
  shell.exec(`git commit -m "chore: :bento:	更新资讯"`)
  shell.exec(`git pull`)
  shell.exec(`git push`)
  console.log('scheduleCronstyle:' + new Date());
});
