const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const Temperature = require('./models/temperature')
const GarageState = require('./models/garageState')

mongoose.connect(process.env.MONGODB_URLSHORT, {
    useNewUrlParser: true, useUnifiedTopology: true
})

const router = express.Router()

router.post('/new_short_url', async (req, res) => {
    if (!('longUrl' in req.body)) {
        res.sendStatus(400)
    }
    const newdoc = await ShortUrl.create({ long: req.body.longUrl })
    res.json({ shortUrl: newdoc.short })
    // console.log({shortened: newdoc.short})
})

router.post('/logdata/:apikey/:dtype', async (req, res) => {
    if (req.params.apikey == process.env.DATA_WRITE_KEY) {
        switch (req.params.dtype) {
            case 'temperature':
                try {
                    await Temperature.create({ celsius: Number(req.body.celsius) })
                } catch {
                    res.sendStatus(400)
                }
                break
            case 'garage':
                try {
                    await GarageState.create({ open: Boolean(Number(req.body.open)) })
                } catch {
                    res.sendStatus(400)
                }
                break
            default:
                res.sendStatus(404)
        }
        res.sendStatus(200)
    } else {
        res.sendStatus(403)
    }

})

router.get('/getdata/is_garage_open', async (req, res) => {
    GarageState.find().sort("-time").limit(1).exec((error, data) => {
        if (error) {
            res.sendStatus(400)
        } else {
            res.json(data[0])
        }
    })

})

router.get('/getdata/all_garage_data', async (req, res) => {
    GarageState.find().sort("time").exec((error, data) => {
        if (error) {
            res.sendStatus(400)
        } else {
            res.json(data)
        }
    })
})

router.get('/getdata/current_temperature', async (req, res) => {
    Temperature.find().sort("-time").limit(1).exec((error, data) => {
        if (error) {
            res.sendStatus(400)
        } else {
            res.json(data[0])
        }
    })

})

router.get('/getdata/all_temperature_data', async (req, res) => {
    Temperature.find().sort("time").exec((error, data) => {
        if (error) {
            res.sendStatus(400)
        } else {
            res.json(data)
        }
    })
})

router.get('/redirect/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) {
        console.log("not found")
        return res.sendStatus(404)
    }

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.long)
})
module.exports = router