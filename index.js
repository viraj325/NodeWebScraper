const cheerio = require('cheerio');
const { gotScraping } = require('got-scraping');
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log("NodeJS Loaded")
    res.send('Hello World!')
})

app.get('/example', (req, res) => {
    parseFunction('https://news.ycombinator.com/').then(r => {
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
    const entries = $('.athing');
    const elementTextList = []
    // Loop through the entries
    for (const entry of entries) {
        const element = $(entry);
        // Write each element's text to the terminal
        console.log(element.text());
        elementTextList.push(element.text())
    }

    return elementTextList
}