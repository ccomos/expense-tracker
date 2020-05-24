const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
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

app.get('/creat', (req, res) => {
  res.render('creat')
})

app.post('/creat', (req, res) => {
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

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((records) => res.render('edit', { records }))
    .catch(error => console.log(error))
})

app.post('/records/:id', (req, res) => {
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

app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/filter/:category', (req, res) => {
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

app.listen(port, () => {
  console.log(`App is listening on localhost:${port}`)
})
