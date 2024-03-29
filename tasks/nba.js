const puppeteer = require("puppeteer");
const { formatDateTime } = require("../tools");

const task = async () => {
  try {
    // 打开chrome浏览器
    const browser = await puppeteer.launch({
      headless: false
    });
    // 新建页面
    const page = await browser.newPage();
    // 跳转到腾讯体育NBA
    await page.goto("https://xw.qq.com/m/nba");
    // 文章列表选择器
    const listSelector = "div.container div.container a";
    // 等待文章列表选择器加载完成
    await page.waitForSelector(listSelector, {
      timeout: 5000
    });

    // 通过选择器找到对应列表项的标题和链接
    const res = await page.$$eval(listSelector, ele =>
      ele.map(el => ({
        url: el.href,
        text: el.innerText,
      }))
    );
    await browser.close();
    return {
      typeName: 'NBA资讯',
      time: formatDateTime(new Date()),
      data: res
    }
  } catch (error) {
    task()
    throw new Error('请求页面超时，尝试重新连接');
  }

};

module.exports = task
