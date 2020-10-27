const express = require('express')
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose')
const app = express()
const ShortUrl = require('./models/shortUrl')

if (process.env.NODE_ENV == 'production') {
    const enforce = require('express-sslify')
    app.use(enforce.HTTPS({trustProtoHeader: true }))
}

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

mongoose.connect(process.env.MONGODB_URLSHORT, {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))


app.get('/',  async (req, res) => {
    const shortUrls = await ShortUrl.find()
    // res.render('index')

    res.render('index', {shortUrls: shortUrls})
})

app.post('/shortUrls', async (req, res) => {
    // console.log(req.body.fullUrl)
    await ShortUrl.create({full: req.body.fullUrl})
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
    if (shortUrl == null) {
        // console.log("not found")
        return res.sendStatus(404)
    }

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);