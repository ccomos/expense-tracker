const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then(records => {
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

router.get('/filter/:category', (req, res) => {
  const categorySelect = req.params.category
  let totalAmount = 0
  return Record.find({ category: categorySelect })
    .lean()
    .then(records => {
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      res.render('filter', { records, totalAmount, categorySelect })
    })
    .catch(error => console.error(error))
})

module.exports = router