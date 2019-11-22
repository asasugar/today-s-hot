const fs = require("fs");
const path = require("path");

module.exports = {
  // 文件操作
  fileServer: {
    // 默认保存位置
    defaultPath: path.resolve(__dirname, '../html/resource.json'),
    // 写文件
    write (text, path = this.defaultPath) {
      fs.writeFileSync(path, text);
    },
    // 读文件
    read (path = this.defaultPath) {
      return fs.readFileSync(path);
    }
  },
  formatDateTime (date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  }
}
