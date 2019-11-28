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
    // 跳转到腾讯视频vip电影页面
    await page.goto("https://film.qq.com/film_all_list/allfilm.html?type=movie&sort=18");

    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
      if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
        interceptedRequest.abort();
      else
        interceptedRequest.continue();
    })
    // 视频列表选择器
    const listSelector = "ul.figures_list li.list_item .figure_title_score .figure_title a";
    // 等待列表选择器加载完成
    await page.waitForSelector(listSelector, {
      timeout: 5000
    });

    // 通过选择器找到对应列表项的标题和链接,点击前往获取真是
    const arr = await page.$$eval(listSelector, ele => {
      if (ele.length > 10) {
        ele = ele.slice(0, 10)
      }
      return ele.map((el, i) => {
        if (i <= 10) {
          return {
            url: el.href,
            text: el.innerText
          }
        }
      })
    });
    const videoSelect = '#_pic_title_list_ul a.figure_detail';
    const promiseArr = arr.map(async item => {
      const vPage = await browser.newPage();
      await vPage.goto(item.url)
      // 等待含有真实链接的部分加载完成
      await vPage.waitForSelector(videoSelect, {
        timeout: 5000
      });
      const href = await vPage.$eval(videoSelect, ele => ele.href);
      await vPage.close();
      return href
    })
    const links = await Promise.all(promiseArr);
    const res = arr.map((item, index) => {
      return {
        url: links[index],
        text: item.text
      }
    })
    await browser.close();
    return {
      typeName: 'Vip影院',
      time: formatDateTime(new Date()),
      data: res
    }
  } catch (error) {
    task()
    throw new Error('请求页面超时，尝试重新连接');
  }

};
module.exports = task
