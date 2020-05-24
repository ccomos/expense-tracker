const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((records) => res.render('edit', { records }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const editRecord = req.body
  if (editRecord.category === "家居物業") { editRecord.categoryIcon = 'fas fa-home' }
  if (editRecord.category === "交通出行") { editRecord.categoryIcon = 'fas fa-shuttle-van' }
  if (editRecord.category === "休閒娛樂") { editRecord.categoryIcon = 'fas fa-grin-beam' }
  if (editRecord.category === "餐飲食品") { editRecord.categoryIcon = 'fas fa-utensils' }
  if (editRecord.category === "其他") { editRecord.categoryIcon = 'fas fa-pen' }
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, editRecord) //Object.assign(target, sources) 複製Sources所有的屬性至目標 target物件
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router