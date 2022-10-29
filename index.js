const cheerio = require('cheerio');
const { gotScraping } = require('got-scraping');
const express = require('express')
const app = express()
const port = 3000
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD2HCSxg3EEMRzKLO7EdRJ_bOFCHajXDQk",
  authDomain: "seed-ed42b.firebaseapp.com",
  projectId: "seed-ed42b",
  storageBucket: "seed-ed42b.appspot.com",
  messagingSenderId: "2506372283",
  appId: "1:2506372283:web:0efce704433424c1cee59e",
  measurementId: "G-YTCBFCE6CH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

app.get('/', (req, res) => {
    console.log("NodeJS Loaded")
    res.send('Hello World!')
})

app.get('/got_scraping', (req, res) => {
    //https://builtinmtl.com/
    runOnlyGotScraping('https://washington.startups-list.com/')
    res.send('done')
})

app.get('/example', (req, res) => {
    //'https://news.ycombinator.com/'
    parseFunction('https://washington.startups-list.com/').then(r => {
        console.log(r)
        res.send(r)
        /*const ref = firebase.storage().ref().child("/testing.json");
        const jsonString = JSON.stringify({ hello: "world" });

        const blob = new Blob([jsonString], { type: 'application/json' });
        ref.put(blob).then( ... )*/
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
    let $ = cheerio.load(html);
    // Select all the elements with the class name "athing"
    //const entries = $('.athing');
    /*const entries = $('.card.startup');
    let fel = entries.children().first(); // div
    //main_link
    $ = cheerio.load(entries.html())
    let something = $('.main_link')
    let lel = entries.children().last(); // a
    console.log("TagNames Below")
    //console.log(fel);
    //console.log(lel);
    console.log(fel.get(0).tagName);
    console.log(lel.get(0).tagName);
    console.log("TagNames End")*/
    const elementTextList = []
    // Loop through the entries
    /*for (const entry of something) {
        const element = $(entry);
        // Write each element's text to the terminal
        //console.log(element.text());
        elementTextList.push(element.text())
    }*/
    $(".main_link").each(function(i, item) {
        console.log($('img', item).attr('data-src'))
        console.log($("h1", item).text())
        console.log($("p", item).text())
        let object = {
            "img": $('img', item).attr('data-src') ?? "null",
            "h1": $("h1", item).text(),
            "p": $("p", item).text()
        }
        elementTextList.push(object)
    });

    return elementTextList
}

function parseCookingArticles() {

}

function parseTechnologyArticles() {

}

function parseScienceArticles() {

}

function parseSportsArticles() {

}

function parseBusinessArticles() {

}

function parseEntertainmentArticles() {

}

function parseWorldArticles() {

}

//couple of other searches