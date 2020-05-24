const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
  res.render('creat')
})

router.post('/', (req, res) => {
  const creatRecord = req.body
  if (creatRecord.category === "家居物業") { creatRecord.categoryIcon = 'fas fa-home' }
  if (creatRecord.category === "交通出行") { creatRecord.categoryIcon = 'fas fa-shuttle-van' }
  if (creatRecord.category === "休閒娛樂") { creatRecord.categoryIcon = 'fas fa-grin-beam' }
  if (creatRecord.category === "餐飲食品") { creatRecord.categoryIcon = 'fas fa-utensils' }
  if (creatRecord.category === "其他") { creatRecord.categoryIcon = 'fas fa-pen' }
  return Record.create(creatRecord)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router