const puppeteer = require("puppeteer");
const { formatDateTime } = require("../tools");

const task = async () => {
  // 打开chrome浏览器
  const browser = await puppeteer.launch({
    headless: false
  });
  // 新建页面
  const page = await browser.newPage();
  // 跳转到腾讯视频vip电影页面
  await page.goto("https://film.qq.com/film_all_list/allfilm.html?type=movie&sort=18");
  // 视频列表选择器
  const listSelector = "ul.figures_list li.list_item .figure_title_score .figure_title a";
  // 等待列表选择器加载完成
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
    typeName: 'Vip影院',
    time: formatDateTime(new Date()),
    data: res
  }
};

module.exports = task
