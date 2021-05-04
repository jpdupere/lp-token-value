const fetch = require('node-fetch');
const cheerio = require('cheerio');

var address = '0xdd2f8516d4edf5f78a6ea01579a92994a9402899'

async function main() {
    const addrResponse = await fetch(`https://bscscan.com/address/${address}`);
    const addrHtml = await addrResponse.text();
    const tokenResponse = await fetch(`https://bscscan.com/token/${address}`);
    const tokenHtml = await tokenResponse.text();
    const a$ = cheerio.load(addrHtml);
    const totalValue = parseInt(a$('a#availableBalanceDropdown').text().match(/[\d\,]+.\d{2}/)[0].replace(/[\,\.]/g,''));
    const t$ = cheerio.load(tokenHtml);
    const totalSupply = t$('span').filter(function() {
        return t$(this).text().trim() === 'Total Supply:';
      }).parent().next().children('span').text().trim().replace(',', '');
    console.log(totalSupply);
}

(async function() {
    await main();
})();