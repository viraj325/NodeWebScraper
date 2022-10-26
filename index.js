const cheerio = require('cheerio');
const { gotScraping } = require('got-scraping');
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log("NodeJS Loaded")
    res.send('Hello World!')
})

app.get('/got_scraping', (req, res) => {
    runOnlyGotScraping('https://washington.startups-list.com/')
    res.send('done')
})

app.get('/example', (req, res) => {
    //'https://news.ycombinator.com/'
    parseFunction('https://washington.startups-list.com/').then(r => {
        console.log(r)
        res.send(r)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

function runOnlyGotScraping(url) {
    gotScraping
        .get(url)
        .then(({ body }) => console.log(body))
}

const parseFunction = async (url) => {
    const response = await gotScraping(url);
    const html = response.body;

    // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);
    // Select all the elements with the class name "athing"
    //const entries = $('.athing');
    const entries = $('.card.startup');
    let fel = entries.children().first(); // div
    let lel = entries.children().last(); // a
    console.log("TagNames Below")
    //console.log(fel);
    //console.log(lel);
    console.log(fel.get(0).tagName);
    console.log(lel.get(0).tagName);
    console.log("TagNames End")
    const elementTextList = []
    // Loop through the entries
    for (const entry of entries) {
        const element = $(entry);
        // Write each element's text to the terminal
        //console.log(element.text());
        elementTextList.push(element.text())
    }

    return elementTextList
}