const fs = require("fs");
const path = require("path");

module.exports = {
  // 文件操作
  fileServer: {
    // 默认保存位置
    defaultPath: path.resolve(__dirname, '../resource/index.json'),
    // 写文件
    write (text, path = this.defaultPath) {
      fs.writeFileSync(path, text);
    },
    // 读文件
    read (path = this.defaultPath) {
      return fs.readFileSync(path);
    }
  }
}
