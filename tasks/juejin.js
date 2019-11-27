const puppeteer = require("puppeteer");
const { formatDateTime } = require("../tools");

const task = async () => {
  // 打开chrome浏览器
  const browser = await puppeteer.launch({
    headless: false
  });
  // 新建页面
  const page = await browser.newPage();
  // 跳转到掘金
  await page.goto("https://juejin.im");
  // 菜单导航选择器
  const navSelector = ".view-nav .nav-item";
  // 文章列表选择器
  const listSelector = ".entry-list .item a.title";
  // 菜单类别
  const navType = "前端";
  await page.waitFor(navSelector);
  // 导航列表
  const navList = await page.$$eval(navSelector, ele =>
    ele.map(el => el.innerText)
  );
  // 前端导航索引
  const webNavIndex = navList.findIndex(item => item === navType);
  await Promise.all([
    page.waitForNavigation(),
    page.click(`${navSelector}:nth-child(${webNavIndex + 1})`)
  ]);
  // 等待文章列表选择器加载完成
  await page.waitForSelector(listSelector, {
    timeout: 5000
  });
  // 通过选择器找到对应列表项的标题和链接
  const res = await page.$$eval(listSelector, ele =>
    ele.map(el => ({
      url: el.href,
      text: el.innerText
    }))
  );
  await browser.close()
  return {
    typeName: '掘金前端',
    time: formatDateTime(new Date()),
    data: res
  }
};

module.exports = task
