const puppeteer = require('puppeteer');
const config = require('./dogeJSON.json')


async function scrapeDoge(url) {
    url = 'https://www.coindesk.com/price/dogecoin/';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Get the current price
    const [e1] = await page.$x('//*[@id="fusion-app"]/div/div[2]/div/div[1]/div[1]/div/div[1]/div/div[3]/div[1]/span[2]');
    const srcPrice = await e1.getProperty('textContent');
    const priceText = await srcPrice.jsonValue();

    // Get the High price
    const [e2] = await page.$x('//*[@id="fusion-app"]/div/div[2]/div/div[1]/div[1]/div/div[1]/div/div[3]/div[2]/div[3]/div[2]/span');
    const srcHigh = await e2.getProperty('textContent');
    const highText = await srcHigh.jsonValue();

    // Get the Low price
    const [e3] = await page.$x('//*[@id="fusion-app"]/div/div[2]/div/div[1]/div[1]/div/div[1]/div/div[3]/div[2]/div[2]/div[2]/span');
    const srcLow = await e3.getProperty('textContent');
    const lowText = await srcLow.jsonValue();

    browser.close();

    var Doge = new Object();
    Doge.price = "$" + priceText;
    Doge.high = highText;
    Doge.low = lowText;

    const fs = require('fs')

    const jsonString = JSON.stringify(Doge)
    fs.writeFile('./dogeJSON.json', jsonString, err => {
        if (err) {
            console.log('ERROR AT JSON', err)
        }
    })
}

scrapeDoge();