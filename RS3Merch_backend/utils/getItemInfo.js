const https = require('https');
const cheerio = require('cheerio');

function extension(str) {
    return str.replace(/\s/g, '_').replace(/&/g, '%26').replace(/'/, '%27');
}

module.exports = {
    getInfo(uri) {
        return new Promise((resolve, reject) => {
            https.get(uri, (res) => {
                let data = '';

                res.on("data", (chunk) => {
                    data += chunk;
                })

                res.on("end", () => {
                    const $ = cheerio.load(data);

                    let values = { name: $('h1[class=firstHeading]').text().match(/(?<=:)(.*)/)[0] };

                    $('a').each((index, ele) => {
                        if ($(ele).text() == 'Historical price data') {
                            let link = $(ele).attr('title');
                            this.getValues('https://runescape.wiki/w/' + extension(link)).then(res => {
                                Object.assign(values, res);
                            }).catch(err => {
                                reject(`Could not find the requested information, ${err}`);
                            });
                        }
                    });
                    resolve(values);
                });
            });
        });
    },

    getValues(uri) {
        return new Promise((resolve, reject) => {
            https.get(uri, res => {
                let data = '';

                res.on("data", (chunk) => {
                    data += chunk;
                })

                res.on("end", () => {
                    const $ = cheerio.load(data);
                    let valueInfo;

                    let node = $('pre', 'div[id=mw-content-text]');

                    if ($(node).hasClass('mw-code mw-script')) {
                        valueInfo = $(node).text().split(',');
                        valueInfo = valueInfo.slice(valueInfo.length - 91, valueInfo.length);
                        valueInfo = valueInfo.map(value => {
                            return value.split(':')[1].match(/\d+/g)[0];
                        });
                        // Return 1-day, 3-day, 7-day, 30-day and 90-day prices
                        resolve({
                            oneDayValue: valueInfo[90],
                            threeDayValue: valueInfo[87],
                            sevenDayValue: valueInfo[83],
                            thirtyDayValue: valueInfo[60],
                            ninetyDayValue: valueInfo[0],
                        });
                    } else if ($(node) === undefined) {
                        reject('Data not found');
                    } else {
                        valueInfo = $(node).children().text();
                        valueInfo = valueInfo.replace(/\d+:/g, '').replace(/[{}A-Z]/gi, '').split("','");

                        // Return 1-day, 3-day, 7-day, 30-day and 90-day prices
                        resolve({
                            oneDayValue: valueInfo[valueInfo.length - 1].replace(/'/g, ''),
                            threeDayValue: valueInfo[valueInfo.length - 4],
                            sevenDayValue: valueInfo[valueInfo.length - 8],
                            thirtyDayValue: valueInfo[valueInfo.length - 31],
                            ninetyDayValue: valueInfo[valueInfo.length - 91]
                        });
                    }
                });
            });
        });
    }
}