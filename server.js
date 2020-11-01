const express = require('express')
const helmet = require('helmet')
const path = require('path')
const app = express()

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} else {
    const enforce = require('express-sslify')
    app.use(enforce.HTTPS({ trustProtoHeader: true }))
}

// const app = require("https-localhost")()

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'static')));

const api_route = require('./api')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

app.use('/api', api_route)

app.get('/shortener', async (req, res) => {

    // res.render('index')

    res.render('shortener', { shortUrls: [] })
})

app.get('/:shortUrl([a-zA-Z0-9_\-]{5})', async (req, res) => {
    res.redirect('/api/redirect/' + req.params.shortUrl)
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(process.env.PORT || 5000);