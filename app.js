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

app.listen(port, () => {
  console.log(`App is listening on localhost:${port}`)
})
