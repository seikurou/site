const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')

mongoose.connect(process.env.MONGODB_URLSHORT, {
    useNewUrlParser: true, useUnifiedTopology: true
})

const router = express.Router()

router.post('/new_short_url', async (req, res) => {
    const newdoc = await ShortUrl.create({long: req.body.longUrl})
    res.json({shortUrl: newdoc.short})
    // console.log({shortened: newdoc.short})
})

router.get('/redirect/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
    if (shortUrl == null) {
        console.log("not found")
        return res.sendStatus(404)
    }

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.long)
})
module.exports = router