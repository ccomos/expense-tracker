const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const creat = require('./modules/creat')
const records = require('./modules/records')

router.use('/', home)
router.use('/creat', creat)
router.use('/records', records)

module.exports = router